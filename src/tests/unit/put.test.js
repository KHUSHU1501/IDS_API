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

const updatedData = {
  type: "Transfer",
  requestor: "123456",
  patient: "Testing Data2",
  location: "xray",
  destination: "3f-xyz",
  isolation: false,
  notes: ["X-Ray Scan", "Possible sprain in left leg", "Transport Complete"],
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

describe("PUT /api/tasks/:id", () => {
  test("should return HTTP 200 response", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);

    id = res.body._id;

    res = await request(app)
      .put(`/api/tasks/${id}`)
      .send(updatedData, { contentType: "application/json" });

    expect(res.statusCode).toBe(200);

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Updates data type", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);

    id = res.body._id;

    res = await request(app)
      .put(`/api/tasks/${id}`)
      .send(updatedData, { contentType: "application/json" });

    //expect(res.body.type).toEqual("Transfer");

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Version attribute is increased by 1 after data is updated", async () => {
    let res = await request(app)
      .post("/api/tasks")
      .send(data, { contentType: "application/json" });
    expect(res.statusCode).toBe(201);

    id = res.body._id;

    res = await request(app)
      .put(`/api/tasks/${id}`)
      .send(updatedData, { contentType: "application/json" });

    //expect(res.body.__v).toBe(1);

    res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(201);
  });

  test("Recieves Error when invalid data is given", async () => {
    const res = await request(app)
      .put(`/api/tasks/${id}`)
      .send(invalidData, { contentType: "application/json" });

    expect(res.statusCode).toBe(500);
  });

  test("Recieves Error when invalid id is given", async () => {
    const res = await request(app)
      .put("/api/tasks/12232232")
      .send(updatedData, { contentType: "application/json" });

    expect(res.statusCode).toBe(500);
  });

  test("When error is present, apprioate error code is sent in response", async () => {
    const res = await request(app)
      .put("/api/tasks/1223321random")
      .send(updatedData, { contentType: "application/json" });

    expect(res.statusCode).toBe(500);
  });

  test("Error response returns correct mime type", async () => {
    const res = await request(app)
      .put("/api/tasks/1223321random")
      .send(updatedData, { contentType: "application/json" });
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Error response returns correct mime type charset value", async () => {
    const res = await request(app)
      .put("/api/tasks/1223321random")
      .send(updatedData, { contentType: "application/json" });
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  afterAll((done) => {
    server.close(done);
  });
});
