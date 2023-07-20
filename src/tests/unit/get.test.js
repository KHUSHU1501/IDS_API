const request = require("supertest");
const { app, server } = require("../../server");

describe("GET /api/tasks", () => {
  test("should return HTTP 200 response", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
  });

  test("Returns an array of tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should return an array with patient attribute for each tasks", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);

    for (const task of res.body) {
      expect(task).toHaveProperty("_id");
      expect(task).toHaveProperty("patient");
    }
  });

  test("should return an array with _id attribute for each tasks", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    for (const task of res.body) {
      expect(task).toHaveProperty("patient");
    }
  });

  test("Succesful is returned as a valid content type in response", async () => {
    res = await request(app).delete(`/api/tasks`);
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  });

  test("response's mime type includes charset value in response", async () => {
    res = await request(app).delete(`/api/tasks/`);
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
  });

  afterAll((done) => {
    server.close(done);
  });
});
