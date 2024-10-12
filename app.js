import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

//routes declaration

export { app };
