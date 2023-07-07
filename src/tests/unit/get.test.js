const request = require("supertest");
const { app, server } = require("../../server");

// Get the version and author from our package.json
const { version, author } = require("../../../package.json");

describe("GET /api/tasks", () => {
  test("should return HTTP 200 response", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
  });

  test("should return an array with _id and patient attributes for each tasks", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    for (const task of res.body) {
      expect(task).toHaveProperty("_id");
      expect(task).toHaveProperty("patient");
    }
  });

  afterAll((done) => {
    server.close(done);
  });
});
