const request = require("supertest");
const { app, server } = require("../../server");

let id = ""; // Get _id of tasks from list

//Sample Data
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

describe("GET /api/tasks/:id", () => {
  test("Returns task's data", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });

    expect(res.statusCode).toBe(201);
    id = res.body._id;

    res = await request(app).get(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(200);
  });

  test("Successful request returns correct status code response", async () => {
    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(200);
  });

  test("Task data return matches schem", async () => {
    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("type");
    expect(res.body).toHaveProperty("patient");
    expect(res.body).toHaveProperty("location");
    expect(res.body).toHaveProperty("destination");
    expect(res.body).toHaveProperty("requestor");
    expect(res.body).toHaveProperty("isolation");
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("transporter");
  });

  test("Data is returned as a valid content type in response", async () => {
    const res = await request(app).get(`/api/tasks/120203023020302random`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Data's mime type includes charset value in response", async () => {
    const res = await request(app).get(`/api/tasks/120203023020302random`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Returns Time values of created and updated", async () => {
    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(200);
  });

  test("Returns Time values of created and updated", async () => {
    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });

  test("Invalid id given, results in error", async () => {
    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(200);
  });

  test("Recieves Error when invalid id is given", async () => {
    const res = await request(app).get("/api/tasks/12232232");

    expect(res.statusCode).toBe(500);
  });

  test("When error is prresent, apprioate error code is sent in response", async () => {
    const res = await request(app).get(`/api/tasks/120203023020302random`);
    expect(res.statusCode).toBe(500);
  });

  test("Error results in error message sent in response", async () => {
    const res = await request(app).get(`/api/tasks/120203023020302random`);
    expect(res.body).toHaveProperty("error");
  });

  test("Error response content type is valid content type", async () => {
    const res = await request(app).get(`/api/tasks/120203023020302random`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Error response mime type includes charset value", async () => {
    const res = await request(app).get(`/api/tasks/120203023020302random`);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Test clean-up", async () => {
    const res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  afterAll((done) => {
    server.close(done);
  });
});
