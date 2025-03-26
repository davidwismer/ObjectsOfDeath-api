import express from "express";
import createError from "http-errors";
import logger from "morgan";
import answersRouter from "./routes/answer.js"
import mongoose from 'mongoose';
import cors from "cors"
import "dotenv/config"

//Connection to database
mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/objectofdeath-api');

const app = express();
app.use(cors())
// Log requests (except in test mode).
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: false}));

app.use("/answers", answersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send the error status
  res.status(err.status || 500);
  res.send(err.message);
});

export default app;