import express from "express";
import mainRouter from "./router/mainRouter.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
const logger = morgan("dev");
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));

const handleListening = () => console.log(` ✅ Sever Runing on port ${PORT} `);

app.listen(PORT, handleListening);
app.use(logger);
app.use("/lib", express.static("src/public"));
app.use("/", mainRouter);
