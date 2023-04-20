const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/all", async (req, res, next) => {
  try {
    const allUsers = await db.query(`SELECT * FROM USERS`);
    return res.json(allUsers.rows);
  } catch (e) {
    return next(e);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { type } = req.query;
    // Use $var not ${var} in query to prevent SQL injection and sanitize input
    const usersByType = await db.query(`SELECT * FROM users WHERE type=$1`, [
      type,
    ]);
    return res.json(usersByType.rows);
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, type } = req.body;
    // RETURNING clause returns values from db when inputting new data
    const newUser = await db.query(
      `INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *`,
      [name, type]
    );
    return res.status(201).json(newUser.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const { id } = req.params.id;
    const updateUser = await db.query(
      `UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING id, name, type`,
      [name, type, id]
    );
    return res.send(updateUser.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const deleteUser = db.query(`DELETE FROM users WHERE id=$1`, [id]);
    return res.send({ msg: `Deleted!` });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
