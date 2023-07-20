const request = require("supertest");
const { app, server } = require("../../server");

describe("PUT /api/tasks/:id", () => {
  test("should return HTTP 200 response", async () => {});

  afterAll((done) => {
    server.close(done);
  });
});
