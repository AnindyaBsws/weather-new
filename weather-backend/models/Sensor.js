import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  light: Number,
  rain: Number,
  moisture: Number,
  pressure: Number,
  createdAt: { type: Date, default: Date.now() }
});

const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;
