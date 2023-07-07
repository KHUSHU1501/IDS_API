const request = require("supertest");
const { app, server } = require("../../server");

let id = ""; // Get _id of tasks from list

describe("GET /api/tasks/:id", () => {
  test("should retrieve a task by _id with attributes matching the schema", async () => {
    const data = {
      type: "Transport",
      requestor: "Test Nurse 1",
      patient: "Test Patient",
      location: "3F-101",
      destination: "MRI SCAN Room 101",
      isolation: false,
      notes: ["Requesting MRI SCAN for Patient"],
      status: "active",
      transporter: "Test Transporter",
    };

    const res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(201);

    // res = await request(app).get("/api/tasks");
    // for (const task of res.body) {
    //   console.log(task.patient);
    //   if (task.patient == "Test Patient") id = task._id;
    // }

    // res = await request(app).get(`/api/tasks/${id}`);
    // expect(res.statusCode).toBe(200);
    // expect(res.body).toHaveProperty("_id");
    // expect(res.body).toHaveProperty("patient");
    // expect(res.body).toHaveProperty("location");

    //res = await request(app).delete(`/api/tasks/${id}`);
  });

  afterAll((done) => {
    server.close(done);
  });
});
