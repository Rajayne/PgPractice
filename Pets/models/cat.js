const db = require("../db");

class Cat {
  static async getAll() {
    const cats = await db.query(`SELECT * FROM cats`);
    return cats.rows;
  }
  static async getById(id) {
    const cat = await db.query(`SELECT * FROM cats WHERE id=$1`, [id]);
    return cat.rows[0];
  }
}

module.exports = Cat;
