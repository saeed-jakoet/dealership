import React, { useState, useEffect } from 'react';
import { Link, animateScroll as scroll, Element } from 'react-scroll';
import './Listings.css';
import car1Image from './images/27333502.jpeg';
import car2Image from './images/27333502.jpeg';
import car3Image from './images/27333502.jpeg';

const Listings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const mockCars = [
      { id: 1, name: 'Toyota Camry', imageUrl: car1Image },
      { id: 2, name: 'Honda Accord', imageUrl: car2Image },
      { id: 3, name: 'Ford Fusion', imageUrl: car3Image },
    ];

    setCars(mockCars.slice(0, 3));
  }, []);

  return (
    <Element name='listings'>
      <div className='listings' id='listings'>
        <div className='container'>
          <h2>Featured Cars</h2>
          {cars.map((car) => (
            <div className='car-card' key={car.id}>
              <img src={car.imageUrl} alt={`Car ${car.id}`} />
              <div className='car-details'>
                <p>{car.name}</p>
                <Link to='demo' smooth={true} duration={500}>
                  <button className='showroom-button'>View In Showroom</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
};

export default Listings;
