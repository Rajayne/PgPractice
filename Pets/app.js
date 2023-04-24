const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

const cRoutes = require("./routes/cats");
app.use("/cats", cRoutes);

app.use((req, res, next) => {
  const err = new ExpressError("Not found", 404);
  return next(err);
});

app.use((err, req, res, next) => {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
