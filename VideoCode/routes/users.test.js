const request = require("supertest");
const app = require("../app");

// Must state before requiring db
process.env.NODE_ENV = "test";
const db = require("../db");

let testUser;

// Create new user in db before each test
beforeEach(async () => {
  const test = await db.query(
    `INSERT INTO users (name, type) VALUES ('Peanut', 'admin') RETURNING id, name, type`
  );
  testUser = test.rows[0];
});

// Empty users from db after each test
afterEach(async () => {
  await db.query(`DELETE FROM users`);
});

// Stop db connection after all tests are run
afterAll(async () => {
  await db.end();
});

describe("Test beforeEach", () => {
  test("Create testUser", () => {
    console.log(testUser);
    expect(1).toBe(1);
  });
});

describe("GET /users", () => {
  test("Get list of all users", async () => {
    const allUsers = await request(app).get("/users");
    expect(allUsers.statusCode).toBe(200);
    expect(allUsers.body).toEqual({ users: [testUser] });
  });
});

describe("GET /users/:id", () => {
  test("Gets a single user", async () => {
    const user = await request(app).get(`/users/${testUser.id}`);
    expect(user.statusCode).toBe(200);
    expect(user.body).toEqual({ user: testUser });
  });
  test("Responds with 404 for invalid id", async () => {
    const invalidUser = await request(app).get(`/users/0`);
    expect(invalidUser.statusCode).toBe(404);
  });
});

describe("POST /users", () => {
  test("Creates a single user", async () => {
    const newUser = await request(app)
      .post("/users")
      .send({ name: "Prato", type: "admin" });
    expect(newUser.statusCode).toBe(201);
    expect(newUser.body).toEqual({
      user: { id: expect.any(Number), name: "Prato", type: "admin" },
    });
  });
});

describe("PATCH /users/:id", () => {
  test("Updates a single user", async () => {
    const user = await request(app)
      .patch(`/users/${testUser.id}`)
      .send({ name: "Obelia", type: "staff" });
    expect(user.statusCode).toBe(200);
    expect(user.body).toEqual({
      user: {
        id: testUser.id,
        name: "Obelia",
        type: "staff",
      },
    });
  });
  test("Responds with 404 for invalid id", async () => {
    const invalidUser = await request(app).patch(`/users/0`);
    expect(invalidUser.statusCode).toBe(404);
  });
});

describe("DELETE /users/:id", () => {
  test("Deletes a single user", async () => {
    const user = await request(app).delete(`/users/${testUser.id}`);
    expect(user.statusCode).toBe(200);
    expect(user.body).toEqual({ msg: "Deleted!" });
  });
});
