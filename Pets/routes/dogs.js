const express = require("express");
const router = express.Router();
const Dog = require("../models/dog");

router.get("/", async (req, res, next) => {
  try {
    const dogs = await Dog.getAll();
    dogs.forEach((d) => d.speak());
    return res.json(dogs);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
