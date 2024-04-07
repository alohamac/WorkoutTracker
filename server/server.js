import express from "express";
import cors from "cors";
import users from "./routes/users.js";
import exercises from "./routes/exercises.js"
import workouts from "./routes/workouts.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/exercises", exercises);
app.use("/workouts", workouts)
export default app;

