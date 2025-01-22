import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import healthcareRoutes from './routes/healthcareRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use(healthcareRoutes);
app.use("/api", diagnosisRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

