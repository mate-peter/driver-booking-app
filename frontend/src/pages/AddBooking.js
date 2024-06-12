import React, { useState } from 'react';
import axios from 'axios';

function AddBooking() {
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3000/api/bookings',
        { driver, vehicle, startTime, endTime, destination, notes },
        {
          headers: { 'x-auth-token': token }
        }
      );
      // Navigate to home or show success message
    } catch (err) {
      console.error(err);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Add Booking</h2>
      <form onSubmit={handleAddBooking}>
        <div>
          <label>Driver</label>
          <input type="text" value={driver} onChange={(e) => setDriver(e.target.value)} required />
        </div>
        <div>
          <label>Vehicle</label>
          <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
        </div>
        <div>
          <label>Start Time</label>
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div>
          <label>End Time</label>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div>
          <label>Destination</label>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        </div>
        <div>
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button type="submit">Add Booking</button>
      </form>
    </div>
  );
}

export default AddBooking;
