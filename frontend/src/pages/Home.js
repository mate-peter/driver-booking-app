import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driverRes = await axios.get('http://localhost:3000/api/drivers');
        setDrivers(driverRes.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }

      try {
        const bookingRes = await axios.get('http://localhost:3000/api/bookings');
        setBookings(bookingRes.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <h3>Drivers</h3>
      <ul>
        {drivers.map(driver => (
          <li key={driver._id}>{driver.vehicle} - {driver.user?.name}</li>
        ))}
      </ul>
      <h3>Bookings</h3>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            {booking.vehicle} - {booking.destination} - {new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
