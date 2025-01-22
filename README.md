symptoms-checker-backend/
├── config/
│   └── index.js                # Configuration files (e.g., environment variables)
├── controllers/
│   ├── healthcareController.js  #handles the logic for fetching nearby healthcare facilities
│   └── diagnosisController.js   #contain the logic for handling API requests related to symptoms and conditions.
├── routes/
│   ├── healthcareRoutes.js      #define the route and link it to the controller function.
│   └── diagnosisRoutes.js       # Routes for OpenAI-related API
├── services/
│   ├── healthcareService.js     # Business logic for healthcare location (Google API calls)
│   └── diagnosisService.js      # Business logic for OpenAI API
├── utils/
│   └── diagnosisService.js       # Helper functions (e.g., loading Google Maps script)
├── node_modules/                # Dependencies (not pushed to version control)
├── .env                         # Environment variables (e.g., API keys)
├── .gitignore                   # Git ignore file (node_modules, .env, etc.)
├── package.json                 # Project metadata and dependencies
└── server.js                    # Main entry point of the application
