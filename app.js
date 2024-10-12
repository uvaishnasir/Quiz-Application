import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//routes declaration
import userRoutes from "./routes/user.routes.js";
import quizRoutes from "./routes/quiz.routes.js";

//mounting routes
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);

export { app };
