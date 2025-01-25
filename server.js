import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthcareRoutes from './routes/healthcareRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import mongoose from 'mongoose';
import searchHistoryRoutes from './routes/searchHistoryRoutes.js';

const app = express();

dotenv.config();
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGODB_LINK)
.then(() => console.log('We are connected to mongodb'))
.catch((err) => console.log(err))

app.use("/api", diagnosisRoutes);
app.use(healthcareRoutes);
app.use(searchHistoryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

