const request = require('supertest');
const app = require('../app');

// Must state before requiring db
process.env.NODE_ENV = 'test';
const db = require('../db');
const { beforeEach, describe, test, afterEach } = require('node:test');

let testUser;

// Create new user in db before each test
beforeEach(async () => {
    const test = db.query(`INSERT INTO users (name, type) VALUES ('Peanut', 'admin') RETURNING id, name, type`);
    testUser = test.rows[0];
})

// Empty users from db after each test
afterEach(async () => {
    await db.query(`DELETE FROM users`);
})

// Stop db connection after all tests are run
afterAll(async () => {
    await db.end();
})

describe("Test beforeEach", () => {
    test("Create testUser", () => {
        console.log(testUser);
        expect(1).toBe(1);
    })
})