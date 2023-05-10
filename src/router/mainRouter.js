import express from "express";
import { gameStart, gameResult } from "../controller/mainController.js";

export const mainRouter = express.Router();
mainRouter.get("/", (req, res) => {
  res.render("welcome.ejs");
});

mainRouter.get("/game", gameStart);

mainRouter.post("/result", gameResult);
