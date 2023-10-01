import express from "express";
import { getUser, logInUser } from "../controllers/users.js";

const router = express.Router();

router.get('/getUser/:username', getUser);
router.get('/logInUser/:username/:password', logInUser);
export default router;
