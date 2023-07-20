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
  status: "active",
  transporter: "John Doe",
};

const invalidData = {
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

describe("POST /api/tasks", () => {
  test("Post a new task, should return a 201 status code ", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);

    id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Succesful Post returns _id of task created ", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Succesful Post returns created time value of task created ", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("createdAt");
    id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Succesful Post returns updated time value of task created ", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("updatedAt");
    id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Succesful Post returns correct mime type ", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Succesful Post returns correct mime type charset value ", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    id = res.body._id;

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Recieves Error when invalid/data is missing", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send(invalidData, { contentType: "application/json" });

    expect(res.statusCode).toBe(500);
  });

  test("When error is present, apprioate error code is sent in response", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send(invalidData, { contentType: "application/json" });

    expect(res.statusCode).toBe(500);
  });

  test("Recieves Error when invalid id is given", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send(invalidData, { contentType: "application/json" });

    expect(res.statusCode).toBe(500);
  });

  test("Error response returns correct mime type", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send(invalidData, { contentType: "application/json" });
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Error response returns correct mime type charset value", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send(invalidData, { contentType: "application/json" });
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  afterAll((done) => {
    server.close(done);
  });
});
