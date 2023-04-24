const db = require("../db");

class Cat {
  static async getAll() {
    const cats = await db.query(`SELECT * FROM cats`);
    return cats.rows;
  }
}

module.exports = Cat;
