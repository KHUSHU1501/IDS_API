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

  test("should return correct version in response", async () => {
    const res = await request(app).get("/");
    expect(res.body.version).toEqual(version);
  });

  test("should return correct author in response", async () => {
    const res = await request(app).get("/");
    expect(res.body.author).toEqual(author);
  });

  test("should return correct description in response", async () => {
    const res = await request(app).get("/");
    expect(res.body.description).toEqual("Internal Dispatch System API");
  });

  test("Healthcheck is returned as a valid content type in response", async () => {
    const res = await request(app).get("/");
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Data's mime type includes charset value in response", async () => {
    const res = await request(app).get("/");
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Invalid route request returns error", async () => {
    const res = await request(app).get("/invalidPage/");
    expect(res.statusCode).toBe(404);
  });

  test("Error response is returned as a valid content type in response", async () => {
    const res = await request(app).get("/invalidPage/");
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  });

  test("Error Response's mime type includes charset value in response", async () => {
    const res = await request(app).get("/invalidPage/");
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  });

  afterAll((done) => {
    setTimeout(() => {
      server.close(done);
    }, 4000); // Delay of 5000 ms (5 seconds)
  });
});
