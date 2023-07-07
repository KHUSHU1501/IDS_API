const request = require("supertest");
const { app, server } = require("../../server");

describe("POST /api/tasks", () => {
  test("Post a new task, should return a 201 status code ", async () => {
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

    const res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    console.log(res.body);
    expect(res.statusCode).toBe(201);
  });

  test("Recieves Error when invalid/data is missing", async () => {
    const data = {
      type: "Transport",
      requestor: "Test Nurse 1",
      patient: "",
      location: "",
      destination: "MRI SCAN Room 101",
      isolation: false,
      notes: ["Requesting MRI SCAN for Patient"],
      status: "active",
      transporter: "",
    };

    const res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(500);
  });

  afterAll((done) => {
    setTimeout(() => {
      server.close(done);
    }, 4000); // Delay of 5000 ms (5 seconds)
  });
});
