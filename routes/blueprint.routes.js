const express = require('express');
const router = express.Router();
const Blueprint = require('../models/Blueprint');

// Create a new blueprint
router.post('/', async (req, res) => {
  try {
    const blueprint = new Blueprint(req.body);
    await blueprint.save();
    res.status(201).json(blueprint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blueprints
router.get('/', async (req, res) => {
  try {
    const blueprints = await Blueprint.find().sort({ createdAt: -1 });
    res.json(blueprints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blueprint by ID
router.get('/:id', async (req, res) => {
  try {
    const blueprint = await Blueprint.findById(req.params.id);
    if (!blueprint) {
      return res.status(404).json({ error: 'Blueprint not found' });
    }
    res.json(blueprint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blueprint
router.put('/:id', async (req, res) => {
  try {
    const blueprint = await Blueprint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!blueprint) {
      return res.status(404).json({ error: 'Blueprint not found' });
    }
    res.json(blueprint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a blueprint
router.delete('/:id', async (req, res) => {
  try {
    const blueprint = await Blueprint.findByIdAndDelete(req.params.id);
    if (!blueprint) {
      return res.status(404).json({ error: 'Blueprint not found' });
    }
    res.json({ message: 'Blueprint deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
