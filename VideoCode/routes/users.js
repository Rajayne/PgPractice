const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/all', async (req, res, next) => {
    const allUsers = await db.query(`SELECT * FROM USERS`);
    return res.json(allUsers.rows);
})


module.exports = router;