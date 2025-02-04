import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import SearchHistoryModel from "../models/searchHistoryModel.js";

// Set a different port for the tests
beforeAll(() => {
    process.env.PORT = 5000; 
});

// Setup MongoDB memory server for testing
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Cleanup after each test
afterEach(async () => {
    await SearchHistoryModel.deleteMany(); // Clear test data
});

// Close connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe("Search History API", () => {
    it("should save a search record", async () => {
        const testRecord = {
            symptoms: "fever, cough",
            conditions: "flu, cold",
            date: new Date().toISOString(),
        };

        const res = await request(app).post("/saveRecord").send(testRecord);
        expect(res.statusCode).toBe(201);
        expect(res.body.symptoms).toBe(testRecord.symptoms);
    });

    it("should retrieve search records", async () => {
        const res = await request(app).get("/getRecords");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should delete a record", async () => {
        const newRecord = await SearchHistoryModel.create({
            symptoms: "headache",
            conditions: "migraine",
            date: new Date().toISOString(),
        });

        const res = await request(app).delete(`/deleteRecord/${newRecord._id}`);
        expect(res.statusCode).toBe(200);

        const deletedRecord = await SearchHistoryModel.findById(newRecord._id);
        expect(deletedRecord).toBeNull();
    });
});

