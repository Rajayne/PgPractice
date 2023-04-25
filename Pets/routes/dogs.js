const express = require("express");
const router = express.Router();
const db = require("../db");
// const Dog = require("../models/dog");

router.get("/", async (req, res, next) => {
  try {
    const dogs = await db.query(`SELECT * FROM dogs`);
    return res.json(dogs.rows);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
