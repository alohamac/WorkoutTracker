import express from "express";
import cors from "cors";
import users from "./routes/users.js";
import exercises from "./routes/exercises.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/exercises", exercises);
export default app;

