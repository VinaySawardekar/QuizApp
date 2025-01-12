import {
  createQuiz,
  getQuizById,
  submitAnswers,
  getResults,
} from "./controller";
import { validateBodySchema } from "../../middlewares/validateBodySchema";
const express = require("express");
const quizRouter = express.Router();

quizRouter.post("/", [validateBodySchema], createQuiz);
quizRouter.post("/:id/answers", [validateBodySchema], submitAnswers);
quizRouter.get("/:id", getQuizById);
quizRouter.get("/:id/results/:userId", getResults);

export default quizRouter;
