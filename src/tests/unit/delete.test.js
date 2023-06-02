
// // tests/unit/delete.test.js

const request = require("supertest");
const server = require("../../server");
const db = require("../../../db/taskDb");

describe("DELETE /api/v1/ids/:id", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

    it("should delete an existing id", async () => {
        const response = await request(server).delete("/api/v1/ids/1");
        expect(response.status).toEqual(204);
        }
    );
    it("should return 404 if id does not exist", async () => {
        const response = await request(server).delete("/api/v1/ids/100");
        expect(response.status).toEqual(404);
        }
    );
});
