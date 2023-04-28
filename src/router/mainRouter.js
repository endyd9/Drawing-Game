import express from "express";
import { gameStart, gameResult } from "../controller/mainController.js";
import { decodingImg, vision } from "../middleware/middie.js";
const mainRouter = express.Router();

mainRouter
  .route("/")
  .get(gameStart)
  .post(decodingImg)
  .post(vision)
  .post(gameResult);

export default mainRouter;
