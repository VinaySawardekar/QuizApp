import { Request, Response } from "express";
import { QuizModel, quizzes } from "./model";
import { AnswerModel, answers } from "../answer/model";
import { ResultModel, results } from "../result/model";
import { Question } from "../question/model";
import { statusCode } from "../../config/constants";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utility/customResponse";

const crypto = require("crypto");

/**
 * Creates a new quiz
 * -
 * @description
 * Steps preformed in this method are:
 * - Step-1: Fetch All the quiz from the memory
 * - Step-2: If quiz are available, return the success message and quiz to user.
 * - Step-3: If quiz are not available, return the empty data with message.
 *
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<Quiz> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const createQuiz = async (req: Request, res: Response): Promise<Response> => {
  /**
   * #swagger.tags = ["Quiz"]
   * #swagger.summary = 'Create New Quiz'
   */
  try {
    // Step-1: Extract the quiz details from the request body
    const { title, questions }: { title: string; questions: Question[] } =
      req.body;

    // Step-2: Generate a unique id for the quiz
    let quizId: string = "";
    let isDuplicate = true;

    while (isDuplicate) {
      quizId = crypto.randomUUID();
      isDuplicate = quizzes.some((quiz) => quiz.id === quizId);
    }

    questions.forEach((question) => {
      let questId = crypto.randomUUID();
      while (questions.findIndex((q) => q.id === questId) > -1) {
        questId = crypto.randomUUID();
      }
      question.id = questId;
    });

    // Step-3: Create a new quiz model
    const newQuiz = new QuizModel(quizId, title, questions);

    if (!newQuiz) {
      const message = `Unable to create new quiz.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }

    // Step-4: Save the quiz to the quizzes array
    quizzes.push(newQuiz);
    const savedQuiz = newQuiz;

    if (!savedQuiz) {
      const message = `Unable to save the quiz.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }

    // Step-5: Return the success message and quiz to user
    const message = `Quiz created successfully.`;
    const response = createSuccessResponse(message, [savedQuiz]);
    return res.status(statusCode.CREATED).send(response);
  } catch (err: any) {
    const response = createErrorResponse(err.message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Gets a quiz by its ID.
 * -
 * @description
 * Steps performed in this method are:
 * - Step-1: Take quizId from the request.
 * - Step-2: Verify the quiz from the Quiz Collection <in-memory>.
 * - Step-3: If quiz is valid, return the success message and quiz to user.
 * - Step-4: If quiz is invalid, return the error message to user.
 * - Step-5: If quizId is empty or undefined, return the BAD_REQUEST error.
 *
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<Quiz> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const getQuizById = async (req: Request, res: Response): Promise<Response> => {
  /**
   * #swagger.tags = ["Quiz"]
   * #swagger.summary = 'Get Quiz By Id'
   */
  try {
    // Step-1: Extract the quizId from the request
    const quizId: string = req.params.id;

    // Step-2: Check if the quizId is empty or undefined
    if (!quizId || quizId.trim() === "") {
      const message = `Please provide a valid quiz id.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    // Step-3: Fetch the quiz from the quizzes array
    const quiz = quizzes.find((q) => q.id === quizId);

    // Step-4: If the quiz is not found, return the error message
    if (!quiz) {
      const message = `Unable to fetch the quiz with id: ${quizId}.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }

    // Step-5: Remove the correct answers for public view
    const quizCopy = JSON.parse(JSON.stringify(quiz));
    quizCopy.questions.forEach((q: any) => delete q.correct_option);

    // Step-6: Return the success message and quiz to user
    const message = `Quiz fetched successfully.`;
    const response = createSuccessResponse(message, [quizCopy]);
    return res.status(statusCode.OK).send(response);
  } catch (err: any) {
    const response = createErrorResponse(err.message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Submits the answers for a quiz.
 * @param {Request} req - The request object containing information about the HTTP request.
 * @param {Response} res - The response object used to send the HTTP response.
 * @returns {Promise<Response>} - The HTTP response with the success or error message.
 * @description
 * Steps preformed in this method are:
 * - Step-1: Fetch the quiz from the quizzes array
 * - Step-2: Fetch the question from the quiz.questions array
 * - Step-3: Create a new answer object
 * - Step-4: Add the answer to the answers array
 * - Step-5: Return the success message and the answer object to user
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const submitAnswers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  /**
   * #swagger.tags = ["Quiz"]
   * #swagger.summary = 'Submit the answers for an quiz'
   */
  try {
    const quizId: string = req.params.id;
    const { selectedOption, userId, questionId } = req.body;

    // Edge case: If the quizId is empty or undefined
    if (!quizId || quizId.trim() === "") {
      const message = `Please provide a valid quiz id.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    // Edge case: If the selectedOption is empty or undefined
    if (selectedOption === null || selectedOption === undefined) {
      const message = `Please provide a valid selected option.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    // Edge case: If the userId is empty or undefined
    if (!userId || userId < 1) {
      const message = `Please provide a valid user id.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    // Edge case: If the questionId is empty or undefined
    if (!questionId || questionId.trim() === "") {
      const message = `Please provide a valid question id.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    // Step-1: Fetch the quiz from the quizzes array
    const quiz = quizzes.find((q) => q.id === quizId);

    // Edge case: If the quiz is not found
    if (!quiz) {
      const message = `Unable to fetch the quiz with id: ${quizId}.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }

    // Step-2: Fetch the question from the quiz.questions array
    const question = quiz.questions.find((q) => q.id === questionId);

    // Edge case: If the question is not found
    if (!question) {
      const message = `Question not found!`;
      const response = createErrorResponse(message);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
    }

    // Step-3: Create a new answer object
    const isCorrect = question.correct_option === selectedOption;
    const answer = new AnswerModel(
      userId,
      questionId,
      quizId,
      selectedOption,
      isCorrect
    );

    // Step-4: Add the answer to the answers array
    answers.push(answer);

    // Step-5: Return the success message and the answer object to user
    const resData = { ...answer, correct_option: question.correct_option };
    const message = `Answers Saved Successfully`;
    const response = createSuccessResponse(message, [resData]);
    return res.status(statusCode.OK).send(response);
  } catch (err: any) {
    const response = createErrorResponse(err.message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Gets the results for a quiz attempted by a user.
 * @param {Request} req - The request object containing information about the HTTP request.
 * @param {Response} res - The response object used to send the HTTP response.
 * @returns {Promise<Response>} - The HTTP response with the success or error message.
 * @description
 * Steps performed in this method are:
 * - Step-1: Validate the quizId and userId from the request params.
 * - Step-2: Fetch the user's answers for the quiz.
 * - Step-3: Calculate the score and summary.
 * - Step-4: Return the success message and results to the user.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const getResults = async (req: Request, res: Response): Promise<Response> => {
  /**
   * #swagger.tags = ["Quiz"]
   * #swagger.summary = 'Get results of the quiz for user'
   */
  try {
    const quizId: string = req.params.id;
    const { userId } = req.params;

    // Step-1: Validate the quizId and userId
    if (!quizId || quizId.trim() === "") {
      const message = `Please provide a valid quiz id.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    if (!userId || userId.trim() === "") {
      const message = `Please provide a valid user id.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.BAD_REQUEST).send(response);
    }

    // Step-2: Fetch the user's answers for the quiz
    const userAnswers = answers.filter(
      (ans) => ans.quiz_id === quizId && ans.user_id == userId
    );

    // Edge case: If no answers found for the user
    if (userAnswers.length === 0) {
      const message = `No answers found for the user with id: ${userId} on quiz with id: ${quizId}.`;
      const response = createErrorResponse(message);
      return res.status(statusCode.NOT_FOUND).send(response);
    }

    const score = userAnswers.filter((ans) => ans.is_correct).length;
    const result = new ResultModel(quizId, userId, score, userAnswers);

    // Step-3: Calculate the score and summary
    const foundQuiz = quizzes.find((quiz) => quiz.id === quizId);
    const questions = foundQuiz ? foundQuiz.questions.length : 0;
    const attempted_questions = userAnswers.length;
    const correct_answers = userAnswers.filter((ans) => ans.is_correct).length;
    const wrong_answers = attempted_questions - correct_answers;

    result.summary = {
      questions,
      attempted_questions,
      correct_answers,
      wrong_answers,
    };

    // Step-4: Save the result and return the response
    results.push(result);
    const message = `Results fetched successfully`;
    const response = createSuccessResponse(message, [result]);
    return res.status(statusCode.OK).send(response);
  } catch (error: any) {
    const response = createErrorResponse(error.message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};
export { createQuiz, getQuizById, submitAnswers, getResults };
