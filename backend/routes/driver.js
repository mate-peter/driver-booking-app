const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create a new driver
router.post('/', auth, async (req, res) => {
  const { vehicle, available } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const driver = new Driver({
      user: req.user.id,
      vehicle,
      available
    });

    await driver.save();
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find().populate('user', ['name', 'email']);
    res.json(drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific driver
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('user', ['name', 'email']);

    if (!driver) {
      return res.status(404).json({ msg: 'Driver not found' });
    }

    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
