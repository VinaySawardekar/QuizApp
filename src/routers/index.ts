const express = require("express");
const router = express.Router();
import { healthCheck, init } from "../controllers/healthCheckController";
import quizRoutes from "../modules/quiz/route";

router.get("/", init);
router.get("/health-check", healthCheck);
router.use("/quizzes", quizRoutes);

export default router;
