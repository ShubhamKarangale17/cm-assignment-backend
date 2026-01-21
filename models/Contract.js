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

const contractSchema = new mongoose.Schema({
  blueprintId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['created', 'approved', 'sent', 'signed', 'locked', 'revoked'],
    default: 'created',
  },
  fields: [formFieldSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contract', contractSchema);
