const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Create a new booking
router.post('/', auth, async (req, res) => {
  const { driver, vehicle, startTime, endTime, destination, notes } = req.body;

  try {
    const booking = new Booking({
      user: req.user.id,
      driver,
      vehicle,
      startTime,
      endTime,
      destination,
      notes
    });

    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user driver', ['name', 'email']);
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user driver', ['name', 'email']);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
