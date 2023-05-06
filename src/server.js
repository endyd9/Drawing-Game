import express from "express";
import { mainRouter, apiRouter } from "./router/Router.js";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const server = createServer(app);

export const io = new Server(server, {});

app.use(express.json());
const logger = morgan("dev");
const PORT = 4500;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true, limit: 9999999999999 }));

const handleListening = () => console.log(` ✅ Sever Runing on port ${PORT} `);

app.listen(PORT, handleListening);
app.use(logger);
app.use("/lib", express.static("src/public"));
app.use("/", mainRouter);
app.use("/api", apiRouter);
