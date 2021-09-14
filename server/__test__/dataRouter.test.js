require("dotenv").config();
const request = require("supertest");
const server = require("../src/server.js");
const db = require('../data/dbConfig.js');
beforeAll(async ()=>{
  await db('QueryCache').truncate();
})
describe("GET requests to /api/data/*", () => {
  it("should respond with data about the user query", async () => {
    const result = await request(server).get("/api/data/launch/upcoming/?search=spacex");
    expect(result.body.length).toBe(10);
  });
});