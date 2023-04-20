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


module.exports = router;