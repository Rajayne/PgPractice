const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const cats = await db.query(`SELECT * FROM cats`);
    return res.json({ cats: cats.rows });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
