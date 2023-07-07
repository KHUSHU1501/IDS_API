const request = require("supertest");
const { app, server } = require("../../server");

describe("DELETE /api/tasks", () => {
  test("Show delete message when task is deleted", async () => {
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

    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(201);

    let id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);

    expect(res.body.message).toBe("Task Deleted!");
    expect(res.statusCode).toBe(201);
  });

  test("Attempting to delete with invalid id shows error", async () => {
    const res = await request(app).delete(`/api/tasks/3812923282323randomid`);
    expect(res.statusCode).toBe(404);
  });

  afterAll((done) => {
    server.close(done);
  });
});
