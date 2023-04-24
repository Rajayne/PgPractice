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

router.get("/:id", async (req, res, next) => {
  try {
    const cat = await Cat.getById(req.params.id);
    return res.json(cat);
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.addCat(name, age);
    return res.json(cat);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const cat = await Cat.deleteCat(req.params.id);
    return res.json({ msg: "Deleted!" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
