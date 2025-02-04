import express from 'express';
import { getRecord, saveRecord, deleteRecord } from '../controllers/searchHistoryController.js';

const router = express.Router();

router.get('/getRecords', getRecord);
router.post('/saveRecord', saveRecord);
router.delete('/deleteRecord/:id', deleteRecord);


export default router;

