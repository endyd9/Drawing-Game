import express from "express";
import session from "express-session";
import { mainRouter } from "./router/mainRouter.js";
import { apiRouter } from "./router/apiRouter.js";
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";
import { memoryStorage } from "multer";

const app = express();

const server = createServer(app);

export const io = new Server(server, {});

app.use(express.json());
const logger = morgan("dev");
const PORT = 4500;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true, limit: 9999999999999 }));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    // store: new memoryStorage({ checkPeriod: 10000 }),
    cokie: { maxAge: 10000 },
  })
);

const handleListening = () => console.log(` ✅ Sever Runing on port ${PORT} `);

app.listen(PORT, handleListening);
app.use(logger);
app.use("/lib", express.static("src/public"));
app.use("/", mainRouter);
app.use("/api", apiRouter);
