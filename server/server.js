import express from "express";
import cors from "cors";
import users from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", users);

export default app;

