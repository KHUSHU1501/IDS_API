//test for post.test.js

// tests/unit/post.test.js

const request = require("supertest");
const server = require("../../src/server");
const db = require("../../src/db");

describe("POST /api/v1/ids", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

    it("should create a new id", async () => {
        const response = await request(server).post("/api/v1/ids").send({name: "test"});
        expect(response.status).toEqual(201);
        expect(response.body).toEqual([4]);
        }
    );
    it("should return 400 if name is missing", async () => {
        const response = await request(server).post("/api/v1/ids").send({});
        expect(response.status).toEqual(400);
        }
    );
}
);

// // tests/unit/post.test.js
//
// const request = require("supertest");
// const server = require("../../server");
// const db = require("../../../db/taskDb");
//
// describe("POST /api/v1/ids", () => {
//   beforeAll(async () => {
//     await db.migrate.rollback();
//     await db.migrate.latest();
//     await db.seed.run();
//   });
//
//   afterAll(async () => {
//     await db.destroy();
//   });
//
//   it("should return 201 OK", async () => {
//     const response = await request(server).post("/api/v1/ids").send({
//       name: "test",
//       description: "test",
//       completed: false,
//     });
//     expect(response.status).toEqual(201);
//   });
//
//   it("should return JSON", async () => {
//     const response = await request(server).post("/api/v1/ids").send({
//       name: "test",
//       description: "test",
//       completed: false,
//     });
//     expect(response.type).toEqual("application/json");
//   });
//
//   it("should return the newly created id", async () => {
//     const response = await request(server).post("/api/v1/ids").send({
//       name: "test",
//       description: "test",
//       completed: false,
//     });
//     expect(response.body).toEqual([4]);
//   });
//
//   it("should return 422 if name is missing", async () => {
//     const response = await request(server).post("/api/v1/ids").send({
//       description: "test",
//       completed: false,
//     });
//     expect(response.status).toEqual(422);
//   });
//
//   it("should return 422 if description is missing", async () => {
//     const response = await request(server).post("/api/v1/ids").send({
//       name: "test",
//       completed: false,
//     });
//     expect(response.status).toEqual(422);
//   });
//
//   it("should return 422 if completed is missing", async () => {
//     const response = await request(server).post("/api/v1/ids").send({
//       name: "test",
//       description: "test",
//     });
//     expect(response.status).toEqual(422);
//   });
// });