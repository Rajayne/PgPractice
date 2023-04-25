const db = require("../db");
const ExpressError = require("../expressError");

class Dog {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  static async getAll() {
    const results = await db.query(`SELECT id, name, age FROM dogs`);
    const dogs = results.rows.map((d) => new Dog(d.id, d.name, d.age));
    return dogs;
  }
  static async getById(id) {
    const dog = await db.query(`SELECT * FROM dogs WHERE id=$1`, [id]);
    const d = dog.rows[0];
    if (!d) {
      throw new ExpressError(`Dog not found with id: ${id}`, 404);
    }
    return new Dog(d.id, d.name, d.age);
  }
  static async addDog(newName, newAge) {
    const dog = await db.query(
      `INSERT INTO dogs (name, age) VALUES ($1, $2) RETURNING id, name, age`,
      [newName, newAge]
    );
    const { id, name, age } = dog.rows[0];
    return new Dog(id, name, age);
  }
  async remove() {
    await db.query(`DELETE FROM dogs WHERE id=$1`, [this.id]);
  }
  speak() {
    console.log(`${this.name} says 'Woof'!`);
  }
}

module.exports = Dog;
