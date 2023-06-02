// test for get.test.js
// // tests/unit/get.test.js

const request = require("supertest");
const server = require("../../server");
const db = require("../../../db/taskDb");

describe("GET /api/v1/ids", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("should return 200 OK", async () => {
    const response = await request(server).get("/api/v1/ids");
    expect(response.status).toEqual(200);
  });

  it("should return JSON", async () => {
    const response = await request(server).get("/api/v1/ids");
    expect(response.type).toEqual("application/json");
  });

  it("should return an array", async () => {
    const response = await request(server).get("/api/v1/ids");
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return all ids in the database", async () => {
    const response = await request(server).get("/api/v1/ids");
    expect(response.body.length).toEqual(3);
  });
});

