import express from "express";
import { gameStart, gameResult } from "../controller/mainController.js";
import { getAnswer, vision } from "../middleware/middie.js";
export const mainRouter = express.Router();
export const apiRouter = express.Router();

mainRouter.route("/").get(gameStart).post(gameResult);

apiRouter.route("/").all(getAnswer).all(vision);
