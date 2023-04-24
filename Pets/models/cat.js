const db = require("../db");
const ExpressError = require("../expressError");

class Cat {
  static async getAll() {
    const cats = await db.query(`SELECT * FROM cats`);
    return cats.rows;
  }
  static async getById(id) {
    const cat = await db.query(`SELECT * FROM cats WHERE id=$1`, [id]);
    if (cat.rows.length === 0) {
      throw new ExpressError(`Cat not found with id: ${id}`);
    }
    return cat.rows[0];
  }
  static async addCat(name, age) {
    if (!name || !age) {
      throw new ExpressError(`Missing required data!`, 400);
    }
    const cat = await db.query(
      `INSERT INTO cats (name, age) VALUES ($1, $2) RETURNING *`,
      [name, age]
    );
    return cat.rows[0];
  }
  static async deleteCat(id) {
    const cat = await db.query(`DELETE FROM cats WHERE id=$1 RETURNING id`, [
      id,
    ]);
    if (cat.rows.length === 0) {
      throw new ExpressError(`Cat not found with id:${id}`, 404);
    }
  }
  static async updateCat(id, newName, newAge) {
    const cat = await db.query(
      `UPDATE cats SET name=$1, age=$2 WHERE id=$3 RETURNING *`,
      [newName, newAge, id]
    );
    if (cat.rows.length === 0) {
      throw new ExpressError(`Cat not found with id:${id}`, 404);
    }
    return cat.rows[0];
  }
  static async catBirthday(id) {
    const cat = await db.query(
      `UPDATE cats SET age=age+1 WHERE id=$1 RETURNING *`,
      [id]
    );
    if (cat.rows.length === 0) {
      throw new ExpressError(`Cat not found with id:${id}`, 404);
    }
    return cat.rows[0];
  }
}

module.exports = Cat;
