const request = require("supertest");
const { app, server } = require("../../server");

// Get the version and author from our package.json
const { version, author } = require("../../../package.json");

describe("/ health check", () => {
  test("should return HTTP 200 response", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
  });

  afterAll((done) => {
    server.close(done);
  });
});
