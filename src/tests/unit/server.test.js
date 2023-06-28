const request = require("supertest");
const { app, server } = require("../../server");

// Get the version and author from our package.json
const { version, author } = require("../../../package.json");

describe("/ health check", () => {
  test("should return HTTP 200 response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("should return status: ok in response", async () => {
    const res = await request(app).get("/");
    expect(res.body.status).toEqual("ok");
  });

  test("should return correct version, githubUrl, and author in response", async () => {
    const res = await request(app).get("/");
    expect(res.body.author).toEqual(author);
    expect(res.body.version).toEqual(version);
  });

  afterAll((done) => {
    setTimeout(() => {
      server.close(done);
    }, 4000); // Delay of 5000 ms (5 seconds)
  });
});
