import express from 'express';
import {
  postSensorData,
  getLatestSensorData,
  getNodeMcuStatus
} from '../controllers/sensorController.js';

const router = express.Router();

router.post('/upload', postSensorData);
router.get('/latest', getLatestSensorData);
router.get('/nodemcu-status', getNodeMcuStatus);

export default router;
