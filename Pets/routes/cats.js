const express = require("express");
const router = express.Router();
const db = require("../db");
const Cat = require("../models/cat");

router.get("/", async (req, res, next) => {
  try {
    cats = await Cat.getAll();
    return res.json(cats);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
