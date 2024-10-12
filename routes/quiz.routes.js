import { Router } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizDetails,
  submitQuiz,
} from "../controllers/quiz.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// define routes here --login required for all
router.post("/create", verifyJWT, createQuiz);
router.get("/get-all", verifyJWT, getAllQuizzes);
router.get("/:id", verifyJWT, getQuizDetails);
router.post("/:id/submit", verifyJWT, submitQuiz);

export default router;
