import express from 'express';
import { getRecord, saveRecord } from '../controllers/searchHistoryController.js';

const router = express.Router();

router.get('/getRecords', getRecord);
router.post('/saveRecord', saveRecord)

export default router;
