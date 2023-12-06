

import React, { useState, useEffect } from 'react';
import { Link, animateScroll as scroll, Element } from 'react-scroll';
import './Featured.css';
import car1Image from '../images/audi.jpg';
import car2Image from '../images/audi.jpg';
import car3Image from '../images/audi.jpg';

const Featured = ({ activeContent }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filter, setFilter] = useState({
    type: 'all',
    make: '',
    model: '',
    price: 0,
  });

  useEffect(() => {
    const mockCars = [
      { id: 1, name: 'Toyota Camry', make: 'Toyota', model: 'Camry', price: 15000, imageUrl: car1Image },
      { id: 2, name: 'Honda Accord', make: 'Honda', model: 'Accord', price: 18000, imageUrl: car2Image },
      { id: 3, name: 'Ford Fusion', make: 'Ford', model: 'Fusion', price: 20000, imageUrl: car3Image },
      { id: 4, name: 'Bmw 118i', make: 'Bmw', model: '118i', price: 524425, imageUrl: car3Image }, // Fixed model name
      // Add more cars as needed
    ];

    setCars(mockCars);
    setFilteredCars(mockCars);
  }, []);

  const handleFilterChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const handlePriceChange = (value) => {
    setFilter({
      ...filter,
      price: parseInt(value, 10),
    });
  };

  const handleSearch = () => {
    // Filter the cars based on the current filter settings
    const filtered = cars.filter((car) => {
      return (
        (filter.type === 'all' || (filter.type === 'new' && !car.used) || (filter.type === 'used' && car.used)) &&
        (!filter.make || car.make === filter.make) &&
        (!filter.model || car.model === filter.model) &&
        car.price <= filter.price
      );
    });

    // Update the state only when the user clicks the search button
    setFilteredCars(filtered);
  };

  return (
    <div className={`featured ${activeContent === 'featured' ? 'active' : ''}`}>
      <Element name='featured'>
        <div className='featured' id='featured'>
          <div className='container'>
            {/* Display cars based on filters */}
            <div className='car-list-container'>
              <div className='car-list'>
                {filteredCars.map((car) => (
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
              <form className='filter-form'>
                {/* Form for filtering */}
                <div className='filter-option'>
                  <label>Type:</label>
                  <select name='type' value={filter.type} onChange={handleFilterChange}>
                    <option value='all'>All Cars</option>
                    <option value='new'>New Cars</option>
                    <option value='used'>Used Cars</option>
                  </select>
                </div>

                <div className='filter-option'>
                  <label>Make:</label>
                  <select name='make' value={filter.make} onChange={handleFilterChange}>
                    <option value=''>Select Make</option>
                    {[...new Set(cars.map((car) => car.make))].map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='filter-option'>
                  <label>Model:</label>
                  <select name='model' value={filter.model} onChange={handleFilterChange}>
                    <option value=''>Select Model</option>
                    {filter.make &&
                      [...new Set(cars.filter((car) => car.make === filter.make).map((car) => car.model))].map(
                        (model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        )
                      )}
                  </select>
                </div>

                <div className='filter-option'>
                  <label>Price:</label>
                  <input
                    type='range'
                    name='price'
                    min='0'
                    max='2000000'
                    step='10000'
                    value={filter.price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className='price-slider filter-option'
                  />
                  <span>R{filter.price.toLocaleString()}</span>
                </div>

                <button type='button' onClick={handleSearch} className='search-button'>
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Featured;
