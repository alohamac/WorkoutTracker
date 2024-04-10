import express from "express";
import { insertNewWorkout } from "../controllers/workouts";

const router = express.Router();

router.post('/newWorkout/:userid/:workoutName/:startTime/:endTime/:exercises', insertNewWorkout);

export default router;