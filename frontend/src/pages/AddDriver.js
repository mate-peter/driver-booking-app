import React, { useState } from 'react';
import axios from 'axios';

function AddDriver() {
  const [vehicle, setVehicle] = useState('');
  const [available, setAvailable] = useState(true);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3000/api/drivers',
        { vehicle, available },
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
      <h2>Add Driver</h2>
      <form onSubmit={handleAddDriver}>
        <div>
          <label>Vehicle</label>
          <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
        </div>
        <div>
          <label>Available</label>
          <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
        </div>
        <button type="submit">Add Driver</button>
      </form>
    </div>
  );
}

export default AddDriver;
