const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/all', async (req, res, next) => {
    try {
        const allUsers = await db.query(`SELECT * FROM USERS`);
        return res.json(allUsers.rows);
    } catch (e) {
        return next(e)
    }
})

router.get('/search', async (req, res, next) => {
    try {
        const {type} = req.query;
        // Use $var not ${var} in query to prevent SQL injection and sanitize input
        const usersByType = await db.query(`SELECT * FROM users WHERE type=$1`, [type]);
        return res.json(usersByType.rows);
    } catch (e) {
        return next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, type} = req.body;
        // RETURNING returns values
        const results = await db.query(`INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *`, [name, type]);
        return res.status(201).json(results.rows[0]);
    } catch (e) {
        return next(e);
    }
})

module.exports = router;