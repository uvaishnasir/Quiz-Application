import { Quiz } from "../models/quiz.model.js";

const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    const quiz = await Quiz.create({ title, questions, creator: req.user._id });
    if (!quiz) {
      return res
        .status(500)
        .json({ message: "Something went wrong while creating the quiz" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Quiz created successfully", quiz });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ creator: req.user });
    if (!quizzes) {
      return res
        .status(404)
        .json({ message: "No quizzes found for this user" });
    }
    return res.json(quizzes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getQuizDetails = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    return res.json(quiz);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; //array of user's answer
    const quiz = await Quiz.findById(req.params.id);
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });
    return res.json({ score: score, Total: quiz.questions.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createQuiz, getAllQuizzes, getQuizDetails, submitQuiz };
