import express from 'express';
import { getHealthcareFacilities } from '../controllers/healthcareController.js';

const router = express.Router();

router.get('/nearby-healthcare', getHealthcareFacilities);

export default router;
