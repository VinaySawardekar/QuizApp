import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { createErrorResponse } from "../utility/customResponse";
import { statusCode } from "../config/constants";

const questionSchema = Joi.array().items({
  id: Joi.string(),
  text: Joi.string().required(),
  options: Joi.array().required(),
  correct_option: Joi.number().required(),
});

const validateCreateQuizSchema = Joi.object().keys({
  title: Joi.string().required(),
  questions: questionSchema,
});

const validateSaveAnswersSchema = Joi.object().keys({
  selectedOption: Joi.number().required(),
  userId: Joi.number().required(),
  questionId: Joi.string().required(),
});

const validateBodySchema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { url, method, body } = req;
    if (url.includes("/answers") && method === "POST") {
      try {
        await validateSaveAnswersSchema.validateAsync(body);
      } catch (err: any) {
        const response = createErrorResponse(err.message);
        return res.status(statusCode.UNPROCESSABLE_ENTITY).send(response);
      }
    } else if (url.includes("/") && method === "POST") {
      try {
        await validateCreateQuizSchema.validateAsync(body);
      } catch (err: any) {
        const response = createErrorResponse(err.message);
        return res.status(statusCode.UNPROCESSABLE_ENTITY).send(response);
      }
    }
    next();
  } catch (err: any) {
    const response = createErrorResponse(err.message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};
export { validateBodySchema };
