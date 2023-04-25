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
    return new Dog(d.id, d.name, d.age);
  }
  speak() {
    console.log(`${this.name} says 'Woof'!`);
  }
}

module.exports = Dog;
