import request from "supertest";
import app from "../server.js";
let server;

beforeAll(() => {
  // Assign a random port if PORT is already in use
  const port = process.env.PORT || Math.floor(Math.random() * (60000 - 1024)) + 1024;
  server = app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
});

afterAll(() => {
  server.close(); // Ensure the server closes after tests
});

describe("Diagnosis Routes", () => {
  it("should return conditions for valid symptoms", async () => {
    const response = await request(app)
      .post("/api/check-symptoms")
      .send({ symptoms: "headache, fever" });

    expect(response.statusCode).toBe(200);
    expect(response.body.conditions).toBeDefined();
  });

  it("should return 400 if symptoms are missing", async () => {
    const response = await request(app).post("/api/check-symptoms").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Symptoms are required");
  });

  it("should return details for a valid condition", async () => {
    jest.setTimeout(10000);
    const response = await request(app)
      .post("/api/get-condition-info")
      .send({ condition: "flu" });

    expect(response.statusCode).toBe(200);
    expect(response.body.details).toBeDefined();
  });

  it("should return 400 if condition is missing", async () => {
    const response = await request(app).post("/api/get-condition-info").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Condition is required");
  });

});
