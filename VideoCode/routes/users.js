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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // Use $var not ${var} in query to prevent SQL injection and sanitize input
    const userById = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (userById.rows.length === 0) {
      throw new ExpressError(`No user found with id of ${id}`, 404);
    }
    return res.send({ user: userById.rows[0] });
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
    return res.status(201).json({ user: newUser.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const { id } = req.params;
    const updateUser = await db.query(
      `UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING id, name, type`,
      [name, type, id]
    );
    if (updateUser.rows.length === 0) {
      throw new ExpressError(`Cannot update user with id of ${id}`, 404);
    }
    return res.send({ user: updateUser.rows[0] });
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
