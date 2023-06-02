// getById.test.js
// // test for getById.test.js
// // // tests/unit/getById.test.js

const request = require("supertest");
const server = require("../../server");
const db = require("../../../db/taskDb");

describe("GET /api/v1/ids/:id", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("should return 200 OK", async () => {
    const response = await request(server).get("/api/v1/ids/1");
    expect(response.status).toEqual(200);
  });

  it("should return JSON", async () => {
    const response = await request(server).get("/api/v1/ids/1");
    expect(response.type).toEqual("application/json");
  });

  it("should return an object", async () => {
    const response = await request(server).get("/api/v1/ids/1");
    expect(typeof response.body).toEqual("object");
  });


  it("should return the correct id", async () => {
    const response = await request(server).get("/api/v1/ids/1");
    expect(response.body.id).toEqual(1);
  });

  it("should return the correct name", async () => {
    const response = await request(server).get("/api/v1/ids/1");
    expect(response.body.name).toEqual("test");
  });

  it("should return the correct description", async () => {
    const response = await request(server).get("/api/v1/ids/1");
    expect(response.body.description).toEqual("test");
  });

  it("should return 404 if id does not exist", async () => {
    const response = await request(server).get("/api/v1/ids/100");
    expect(response.status).toEqual(404);
  });
});
