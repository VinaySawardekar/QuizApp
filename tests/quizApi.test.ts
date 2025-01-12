import request from "supertest";
import app from "../index"; // Import your Express app
import { statusCode } from "../src/config/constants";

describe("Quiz App RestAPIs Tests", () => {
  let quizId: string;
  let questionId1: string;
  let questionId2: string;
  const userId = 1;

  describe("POST /api/v1/quizzes - Create Quiz", () => {
    it("should create a new quiz and return 201 status", async () => {
      const quizData = {
        title: "Sample Quiz Title",
        questions: [
          {
            text: "What is the capital of United Kingdom?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct_option: 1,
          },
          {
            text: "What is the capital of Maharashtra?",
            options: ["Mumbai", "Delhi", "Kashmir", "Pune"],
            correct_option: 0,
          },
        ],
      };

      const response = await request(app)
        .post("/api/v1/quizzes")
        .send(quizData)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(statusCode.CREATED);
      expect(response.body.data[0]).toHaveProperty("id");
      expect(response.body.data[0].title).toBe(quizData.title);
      expect(response.body.data[0].questions).toHaveLength(
        quizData.questions.length
      );

      // Store quizId and question IDs for later tests
      quizId = response.body.data[0].id;
      questionId1 = response.body.data[0].questions[0].id;
      questionId2 = response.body.data[0].questions[1].id;

      console.log(quizId, questionId1, questionId2);
    });
  });

  describe("GET /api/v1/quizzes/:quizId - Get Quiz", () => {
    it("should fetch a quiz by ID and return 200 status", async () => {
      const response = await request(app).get(`/api/v1/quizzes/${quizId}`);

      expect(response.status).toBe(statusCode.OK);
      expect(response.body.data[0]).toHaveProperty("id", quizId);
      expect(response.body.data[0]).toHaveProperty("title");
      expect(response.body.data[0]).toHaveProperty("questions");
    });
  });

  describe("POST /api/v1/quizzes/:quizId/answers - Submit Answer", () => {
    it("should submit an answer for the first question and return 200 status", async () => {
      const answerData = {
        selectedOption: 1,
        userId,
        questionId: questionId1,
      };

      const response = await request(app)
        .post(`/api/v1/quizzes/${quizId}/answers`)
        .send(answerData)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(statusCode.OK);
      expect(response.body.data[0]).toHaveProperty("quiz_id", quizId);
      expect(response.body.data[0]).toHaveProperty("question_id", questionId1);
      expect(response.body.data[0]).toHaveProperty(
        "selected_option",
        answerData.selectedOption
      );
      expect(response.body.data[0]).toHaveProperty("is_correct");
    });

    it("should submit an answer for the second question and return 200 status", async () => {
      const answerData = {
        selectedOption: 0,
        userId,
        questionId: questionId2,
      };

      const response = await request(app)
        .post(`/api/v1/quizzes/${quizId}/answers`)
        .send(answerData)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(statusCode.OK);
      expect(response.body.data[0]).toHaveProperty("quiz_id", quizId);
      expect(response.body.data[0]).toHaveProperty("question_id", questionId2);
      expect(response.body.data[0]).toHaveProperty(
        "selected_option",
        answerData.selectedOption
      );
      expect(response.body.data[0]).toHaveProperty("is_correct");
    });
  });

  describe("GET /api/v1/quizzes/:quizId/results/:userId - Get Results", () => {
    it("should fetch quiz results for a user and return 200 status", async () => {
      const response = await request(app).get(
        `/api/v1/quizzes/${quizId}/results/${userId}`
      );

      expect(response.status).toBe(statusCode.OK);
      expect(response.body.data[0]).toHaveProperty("quiz_id", quizId);
      expect(response.body.data[0]).toHaveProperty("user_id", "" + userId);
      expect(response.body.data[0]).toHaveProperty("score");
      expect(response.body.data[0]).toHaveProperty("answers");
    });
  });
});
