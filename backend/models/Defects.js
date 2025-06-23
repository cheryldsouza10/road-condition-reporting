const mongoose = require("mongoose");

// server/models/Defect.js
const { Schema, model } = require('mongoose');

const defectSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['Pothole', 'Crack', 'Water Leak']
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Defect', defectSchema);
