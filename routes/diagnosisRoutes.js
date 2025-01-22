import express from "express";
import { checkSymptoms, getConditionInfo } from "../controllers/diagnosisController.js";

const router = express.Router();

// Route for processing symptoms
router.post("/check-symptoms", checkSymptoms);

// Route for getting condition details
router.post("/get-condition-info", getConditionInfo);

export default router;
