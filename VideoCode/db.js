const { Client } = require("pg");
const fs = require("fs");
const { user, password } = require("../dbPassword");

//I set up a password file so that I don't forget and accidentally upload my password to github
let DB_URI =
  process.env.NODE_ENV === "test"
    ? `postgresql://${user}:${password}@localhost:5432/usersdb_test`
    : `postgresql://${user}:${password}@localhost:5432/usersdb`;

const db = new Client({
  connectionString: DB_URI,
});

db.connect();

module.exports = db;
