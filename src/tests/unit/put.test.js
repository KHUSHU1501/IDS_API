const request = require("supertest");
const { app, server } = require("../../server");

describe("PUT /api/tasks/:id", () => {
  test("should return HTTP 200 response", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
  });

  afterAll((done) => {
    server.close(done);
  });
});
