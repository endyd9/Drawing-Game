import express from "express";
import { getAnswer, vision } from "../controller/apiController.js";

export const apiRouter = express.Router();

apiRouter.route("/").post(getAnswer).post(vision);
