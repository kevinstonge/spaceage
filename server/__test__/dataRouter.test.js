require("dotenv").config();
const request = require("supertest");
const server = require("../src/server.js");
const db = require("../data/dbConfig.js");

describe("GET requests to /api/data/apis", () => {
  it("should respond with data about the launch library apis", async () => {
    const result = await request(server).get("/api/data/apis");
    console.log(result.body.data);
  });
});

// describe("GET requests to /api/data/endpoints/:id", () => {
//   it("should respond with data about the endpoints for the specified api id", async () => {
//     const result = await request(server).get("/api/data/endpoints/9");
//     expect(result.body.data.length).toBe(4);
//   });
// });

// describe("GET requests to /api/data/parameters/:id", () => {
//   it("should respond with parameters for the specified endpoint", async () => {
//     const result = await request(server).get("/api/data/parameters/1");
//     expect(result.body.data.length).toBe(19);
//   });
// });
