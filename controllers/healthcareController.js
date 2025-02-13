import axios from 'axios';

export const getHealthcareFacilities = async (req, res) => {
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

        // Check if geoResponse contains valid results
        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
            return res.status(400).json({ error: 'Invalid ZIP code or no results found' });
        }

        const location = geoResponse.data.results[0].geometry.location;
        const { lat, lng } = location;

        // Search for healthcare facilities near the given coordinates
        const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat},${lng}`,
                    radius: 16093, //it is 10 miles
                    type: 'health',
                    keyword: 'emergency room|express care',
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );
        res.json(placesResponse.data.results);
    } catch (error) {
        console.error('Error fetching healthcare facilities:', error.message);
        res.status(500).json({ error: 'Failed to fetch healthcare facilities' });
    }
};
