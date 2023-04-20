const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/all', (req, res, next) => {
    const allUsers = db.query(`SELECT * FROM USERS`);
    return res.json(allUsers.rows);
})


module.exports = router;