import React, { useState } from 'react';
import { Element, Link } from 'react-scroll'; // Import Link from react-scroll
import './Listings.css';
import { carsData } from '../carsData'; 
import ImageCarousel from '../ImageCarousel';

const Listings = () => {
    const [selectedCar, setSelectedCar] = useState(null);

    const handleListingClick = (car) => {
        setSelectedCar(car);
    };

    const handleCloseModal = () => {
        setSelectedCar(null);
    };

    return (
        <Element name='listings'> {/* Add Element with name 'listings' for scrolling */}
            <div className="listings-container">
                <div className="listings-header">
                    <h1>Car Listings</h1>
                    <p>Explore our latest car inventory</p>
                </div>
                {carsData.map((vehicle, index) => (
                    <div key={index} className="vehicle-listing" onClick={() => handleListingClick(vehicle)}>
                        <div className='image-container'>
                            {vehicle.imageUrls && vehicle.imageUrls.length > 0 ? (
                                <img src={vehicle.imageUrls[0]} alt={`${vehicle.name} Vehicle`} />
                            ) : (
                                <p>No Image Available</p>
                            )}
                        </div>
                        <div className='details-container'>
                            <div className='top-details'>
                                <p className='price'>{`R${vehicle.price.toLocaleString()}`}</p>
                            </div>
                            <div className='bottom-details'>
                                <p className='name'>{vehicle.name}</p>
                                <p className='used-status'>{vehicle.used ? 'Used Car' : 'New Car'}</p>
                                <p className='mileage'>Mileage: {vehicle.mileage} km</p>
                                <p className='transmission-type'>Transmission: {vehicle.transmissionType}</p>
                                <p className='dealership-address'>{vehicle.dealershipAddress}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {selectedCar && selectedCar.imageUrls && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-content">
                            <ImageCarousel images={selectedCar.imageUrls} onClose={handleCloseModal} />
                        </div>
                    </div>
                )}
                <Link to='about' smooth={true} duration={500}> {/* Add Link to scroll to the 'about' section */}
                    <div className="scroll-to-about">Scroll to About</div>
                </Link>
            </div>
        </Element>
    );
};

export default Listings;
