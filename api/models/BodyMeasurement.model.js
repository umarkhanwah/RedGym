// models/BodyMeasurement.js
import mongoose from "mongoose";

const BodyMeasurementSchema = new mongoose.Schema({
  traineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
  },
  chest: {
    type: Number,
    required: true,
  },
  back: {
    type: Number,
    required: true,
  },
  shoulder: {
    type: Number,
    required: true,
  },
  foreArm: {
    type: Number,
    required: true,
  },
  arm: {
    type: Number,
    required: true,
  },
  leg: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('BodyMeasurement', BodyMeasurementSchema);
