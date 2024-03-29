const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

const uRoutes = require("./routes/users");
app.use("/users", uRoutes);
const mRoutes = require("./routes/messages");
app.use("/messages", mRoutes);

app.use((req, res, next) => {
  const err = new ExpressError("Not found", 404);

  return next(err);
});

app.use((err, req, res, next) => {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
