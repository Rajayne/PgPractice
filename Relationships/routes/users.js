const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await db.query(`SELECT * FROM users`);
    return res.json({ users: allUsers.rows });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userResult = await db.query(
      `SELECT name, type FROM users WHERE id=$1`,
      [id]
    );
    const messagesResult = await db.query(
      `SELECT id, msg FROM messages WHERE user_id=$1`,
      [id]
    );
    if (userResult.rows.length === 0) {
      throw new ExpressError(`No user found with id of ${id}`, 404);
    }
    const user = userResult.rows[0];
    user.messages = messagesResult.rows;
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
