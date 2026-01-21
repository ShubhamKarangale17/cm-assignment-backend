const mongoose = require('mongoose');

const formFieldSchema = new mongoose.Schema({
  label: {
    type: String,
  },
  type: {
    type: String,
    enum: ['text', 'date', 'checkbox', 'signature', 'fixed'],
    required: true,
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
  },
  value: mongoose.Schema.Types.Mixed,
});

const blueprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  totalFields: {
    type: Number,
    default: 0,
  },
  fields: [formFieldSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blueprint', blueprintSchema);
