# SymptoScan Backend

#### By Tatiana Snook

## Technologies Used:
* Node.js + Express.js – Server and API handling
* MongoDB + Mongoose – Database for storing search history
* OpenAI API – Symptom-based diagnosis and condition details
* Google Maps API – Finding nearby healthcare facilities
* Cors & dotenv – Environment configuration and security

## Description
This is the backend for SymptoScan, a medical symptom analysis application. It provides APIs for:
* Symptom-based condition diagnosis using OpenAI
* Fetching detailed condition information
* Finding nearby healthcare facilities using Google Places API
* Saving and retrieving user search history
  
  The project is deployed and can be accessed at [https://symptoscan.onrender.com](https://symptoscan.onrender.com). Visit the site to explore its features.

## Setup/Installation Requirements
1. Clone the repository
   
    git clone https://github.com/yourusername/symptoscan-backend.git
    cd symptoscan-backend
2. Install dependencies
   
    npm install
3. Set up environment variables
   
   Create a .env file in the root directory and add the following:
    
    PORT=4000
    
    MONGODB_LINK=your_mongodb_connection_string
    
    OPENAI_API_KEY=your_openai_api_key
    
    GOOGLE_API_KEY=your_google_maps_api_key
4. Run the server
   
    npm start
    
    The server will start on http://localhost:4000

## Deployment

Render Deployment
To deploy on Render:

1. Create a new Web Service
2. Connect the GitHub repository
3. Set environment variables in Render Dashboard
4. Deploy

## Known Issues

* No known issues at this time.
* Feel free to adjust it further based on your preferences.