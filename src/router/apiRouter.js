import express from "express";
import { getAnswer, vision } from "../middleware/middie.js";

export const apiRouter = express.Router();

apiRouter.route("/").post(getAnswer).post(vision);
