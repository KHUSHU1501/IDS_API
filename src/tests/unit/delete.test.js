const request = require("supertest");
const { app, server } = require("../../server");

let id = "";
const data = {
  type: "Transport",
  requestor: "123456",
  patient: "Testing Data2",
  location: "xray",
  destination: "3f-xyz",
  isolation: false,
  notes: ["X-Ray Scan", "Possible sprain in left leg"],
  status: "notAssigned",
  transporter: "John Doe",
};

describe("DELETE /api/tasks", () => {
  test("When task is deleted, delete response is sent back to user", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(201);

    let id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);

    expect(res.body.message).toBe("Task Deleted!");
    expect(res.statusCode).toBe(201);
  });

  test("Deleting task results in correct status code within response", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(201);

    id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Succesful is returned as a valid content type in response", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(201);

    id = res.body._id;
    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("response's mime type includes charset value in response", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(201);

    id = res.body._id;
    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Attempting to delete with invalid id results in error", async () => {
    const res = await request(app).delete(`/api/tasks/3812923282323randomid`);
    expect(res.statusCode).toBe(500);
  });

  test("Error response sends back correct error status code", async () => {
    const res = await request(app).delete(`/api/tasks/3812923282323randomid`);
    expect(res.statusCode).toBe(500);
  });

  test("Error response returns error message", async () => {
    const res = await request(app).delete(`/api/tasks/3812923282323randomid`);
    expect(res.body).toHaveProperty("message");
  });

  test("Delete error response content type is valid content type", async () => {
    const res = await request(app).delete(`/api/tasks/120203023020302random`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Delete error response mime type includes charset value", async () => {
    const res = await request(app).delete(`/api/tasks/120203023020302random`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  afterAll((done) => {
    server.close(done);
  });
});
