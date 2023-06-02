// test for put.test.js
// // tests/unit/put.test.js

const request = require("supertest");
const server = require("../../src/server");
const db = require("../../src/db");

describe("PUT /api/v1/ids/:id", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

    it("should update an existing id", async () => {
        const response = await request(server).put("/api/v1/ids/1").send({name: "test"});
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([1]);
        }
    );
    it("should return 404 if id does not exist", async () => {
        const response = await request(server).put("/api/v1/ids/100").send({name: "test"});
        expect(response.status).toEqual(404);
        }
    );
});
