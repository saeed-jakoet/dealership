import React, { useState, useEffect } from 'react';
import './Listings.css';
import car1Image from './images/27333502.jpeg';
import car2Image from './images/27333502.jpeg';
import car3Image from './images/27333502.jpeg';

const Listings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Mock data for testing
    const mockCars = [
      { id: 1, name: 'Toyota Camry', imageUrl: car1Image },
      { id: 2, name: 'Honda Accord', imageUrl: car2Image },
      { id: 3, name: 'Ford Fusion', imageUrl: car3Image },
      // Add more cars as needed
    ];

    setCars(mockCars.slice(0, 3)); // Limit to 3 cars
  }, []);

  return (
    <div className='listings' id='listings'>
      <div className='container'>
        <h2>Featured Cars</h2>
        <div className='featured-cars'>
          {cars.map((car) => (
            <div className='car-card' key={car.id}>
              <img src={car.imageUrl} alt={`Car ${car.id}`} />
              <div className='car-details'>
                <p>{car.name}</p>
                <button className='showroom-button'>View in Showroom</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Listings;
