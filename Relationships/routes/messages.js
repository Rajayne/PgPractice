const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/:id", async (req, res, next) => {
  try {
    const message = await db.query(
      `SELECT m.id, m.msg, t.tag
      FROM messages AS m
      LEFT JOIN message_tags AS mt
      ON m.id = mt.message_id
      LEFT JOIN tags AS t
      ON mt.tag_code = t.code
      WHERE m.id=$1`,
      [req.params.id]
    );
    const { id, msg } = message.rows[0];
    const tags = message.rows.map((r) => r.tag);
    return res.json({ id, msg, tags });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
