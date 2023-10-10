import express from "express";
import { getExercises } from "../controllers/exercises";

const router = express.Router();

router.get('/getExercises/:userId', getExercises);
export default router;