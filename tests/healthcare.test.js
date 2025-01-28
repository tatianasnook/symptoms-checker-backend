import { getHealthcareFacilities } from "../controllers/healthcareController";
import axios from "axios";
import { createRequest, createResponse } from "node-mocks-http"; // A utility for mock HTTP requests/responses

jest.mock('axios');  // Mock axios globally

describe("Healthcare Controller - getHealthcareFacilities", () => {

  it("should return healthcare facilities for a valid zip code", async () => {
    const mockGeoData = {
      data: {
        results: [
          {
            geometry: { location: { lat: 40.7128, lng: -74.0060 } }, // New York example
          },
        ],
      },
    };

    const mockPlacesData = {
      data: {
        results: [
          { name: "Healthcare Facility 1", vicinity: "Location 1" },
          { name: "Healthcare Facility 2", vicinity: "Location 2" },
        ],
      },
    };

    // Mock the axios.get requests in sequence
    axios.get.mockResolvedValueOnce(mockGeoData) // Mock the geocode request
             .mockResolvedValueOnce(mockPlacesData); // Mock the places request

    const req = createRequest({
      query: { zipCode: "12345" }
    });

    // Mock response object to capture statusCode and response data
    const res = createResponse();

    // Call the actual controller function
    await getHealthcareFacilities(req, res);

    // Check that the status code is 200 and the correct data is returned
    expect(res.statusCode).toBe(200);
    
    // Parse the response data string to object before comparison
    expect(JSON.parse(res._getData())).toEqual(mockPlacesData.data.results); // Ensure correct comparison
  });

  it("should handle errors when fetching healthcare facilities", async () => {
    const errorMessage = "Failed to fetch healthcare facilities";

    // Mock axios to throw an error
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const req = createRequest({
      query: { zipCode: "12345" },
    });
    const res = createResponse();

    await getHealthcareFacilities(req, res);

    // Check that the status code is 500 and the error message is returned
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual('{"error":"Failed to fetch healthcare facilities"}');
  });
});
