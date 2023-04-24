const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await db.query(`SELECT id, msg FROM messages WHERE id=$1`, [
      id,
    ]);
    return res.json(message.rows[0]);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
