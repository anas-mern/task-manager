const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const limitter = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");
require("dotenv").config();
require("express-async-errors");
//Builtin Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(sanitize());
app.use(
  limitter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

//Routes
const TaskRouter = require("./routes/TaskRoute");
const AuthRouter = require("./routes/AuthRoute");
app.use("/api/v1/tasks", TaskRouter);
app.use("/api/v1/auth", AuthRouter);

//Error Handle
const notFound = require("./Middleware/notFound");
const errorHandle = require("./Middleware/errorHandle");
app.use(notFound);
app.use(errorHandle);

//Start
const { TaskConnect } = require("./connections/TaskConection");
const start = async (url) => {
  await TaskConnect(url);
  app.listen(port,'0.0.0.0', () => {
    console.log(`Running On ${port}`);
  });
};

start(process.env.MONGO_URI);
