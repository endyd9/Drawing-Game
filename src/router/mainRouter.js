import express from "express";
import { gameStart, gameResult } from "../controller/mainController.js";

export const mainRouter = express.Router();

mainRouter.route("/").get(gameStart).post(gameResult);
