require("dotenv").config();
const request = require("supertest");
const server = require("../src/server.js");
const db = require("../data/dbConfig.js");

describe("GET requests to /api/data/", () => {
  it("should respond with data about the launch library api", async () => {
    const result = await request(server).get("/api/data/");
    expect(result.body.data.length).toBe(15);
  });
});
