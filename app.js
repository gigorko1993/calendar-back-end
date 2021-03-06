const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const tasksRouter = require("./routes/tasks/tasks");
const usersRouter = require("./routes/users/users");
const { HttpCode } = require("./config/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

app.use((req, res) => {
  res
    .status(HttpCode.FORBIDDEN)
    .json({ status: "error", code: HttpCode.FORBIDDEN, message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(`error`, err);
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    status: statusCode === HttpCode.INTERNAL_SERVER_ERROR ? "fail" : "error",
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
