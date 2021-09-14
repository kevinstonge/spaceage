require("dotenv").config();
const request = require("supertest");
const server = require("../src/server.js");
const db = require('../data/dbConfig.js');
const email = "asdf@gmail.com";
const password = "asdf1234";
beforeAll(async ()=>{
  await db('Users').truncate();
})
describe("POST requests to /api/users/signup", () => {
  it("given valid email and password, should respond with a success message and a token", async () => {
    const result = await request(server).post("/api/users/signup").send({email, password});
    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
    expect(result.body.token.length).toBeGreaterThan(5);
  });
  it("given invalid email and password, should respond with an error message", async () => {
    const result = await request(server).post("/api/users/signup").send({email: "asdf", password:"asdf"});
    expect(result.status).toBe(400);
    expect(result.body.message).toBeDefined();
  });
  it("given an email that already exists in the database, should respond with an error message", async () => {
    const result = await request(server).post("/api/users/signup").send({email, password});
    expect(result.status).toBe(409);
    expect(result.body.message).toBeDefined();
  })

});
describe("POST requests to /api/users/login", () => {
  it("given correct credentials, should respond with a success message and a token", async () => {
    const result = await request(server).post("/api/users/login").send({email,password});
    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
    expect(result.body.token.length).toBeGreaterThan(5);
  });
  it("given incorrect credentials, should respond with an error message", async () => {
    const result = await request(server).post("/api/users/login").send({email,password:"incorrect"});
    expect(result.status).toBe(401);
    expect(result.body.message).toBeDefined();
  })
});