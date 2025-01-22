import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/nearby-healthcare', async (req, res) => {
    const { zipCode } = req.query;
    
    try {
        // Convert ZIP code to coordinates using Google Geocoding API
        const geoResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    address: zipCode,
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );

        const location = geoResponse.data.results[0].geometry.location;
        const { lat, lng } = location;

        // Search for healthcare facilities near the given coordinates
        const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat},${lng}`,
                    radius: 100000, // Search within 5 km
                    type: 'hospital',
                    keyword: 'clinic|urgent care|doctor', // Change to 'clinic', 'doctor', etc., if needed
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );

        res.json(placesResponse.data.results);
    } catch (error) {
        console.error('Error fetching healthcare facilities:', error.message);
        res.status(500).json({ error: 'Failed to fetch healthcare facilities' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

