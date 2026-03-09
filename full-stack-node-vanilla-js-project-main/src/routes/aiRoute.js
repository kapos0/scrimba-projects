import express from "express";
import { chatCompletions } from "../controllers/aiController.js";

export const aiRouter = express.Router();

aiRouter.post("/", chatCompletions);
