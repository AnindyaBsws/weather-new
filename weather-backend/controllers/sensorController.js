import Sensor from '../models/Sensor.js';

let nodeMcuConnected = false;

export const postSensorData = async (req, res) => {
  try {
    const sensor = new Sensor(req.body);
    await sensor.save();
    nodeMcuConnected = true;
    res.json({ message: 'Sensor data saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLatestSensorData = async (req, res) => {
  try {
    const latest = await Sensor.findOne().sort({ createdAt: -1 });
    res.json(latest || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNodeMcuStatus = (req, res) => {
  res.json({ connected: nodeMcuConnected });
};
