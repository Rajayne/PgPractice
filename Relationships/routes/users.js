const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await db.query(`SELECT * FROM USERS`);
    return res.json({ users: allUsers.rows });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
