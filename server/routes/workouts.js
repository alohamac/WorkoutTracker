import express from "express";
import { insertNewWorkout } from "../controllers/workouts";

const router = express.Router();

router.post('/newWorkout/:userid/:exercises/:exerciseSet', insertNewWorkout);

export default router;