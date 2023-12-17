// Listings.js
import React, { useState, useEffect, useMemo } from 'react';
import { Element } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Listings.css'; 
import { carsData } from '../carsData';
import ImageCarousel from '../ImageCarousel';
import EnquiryForm from './EnquiryForm';

import noCarPhoto from '../images/nophotocar.jpg';
import mileageIcon from '../images/icons/mileage.jpg';
import fuelIcon from '../images/icons/fuel.jpg';
import transmissionIcon from '../images/icons/transmission.jpg';
import calendar from '../images/icons/calendar.png';

const Listings = () => {
    const [selectedCar, setSelectedCar] = useState(null);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [disableScroll, setDisableScroll] = useState(false);

    const sortedCarsData = useMemo(() => {
        // Sort the carsData array alphabetically by brand
        return [...carsData].sort((a, b) => a.brand.localeCompare(b.brand));
    }, []);

    const handleListingClick = (car) => {
        setSelectedCar(car);
        setShowEnquiryForm(false);
        setDisableScroll(true);
    };

    const handleCloseModal = () => {
        setSelectedCar(null);
        setShowEnquiryForm(false);
        setDisableScroll(false);
    };

    useEffect(() => {
        const handleBodyScroll = () => {
            if (disableScroll) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        };
    
        // Add event listener for scroll
        window.addEventListener('scroll', handleBodyScroll);
    
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleBodyScroll);
            // Reset overflow property when component unmounts
            document.body.style.overflow = 'auto';
        };
    }, [disableScroll]);

    const handleFormButtonClick = (e) => {
        e.stopPropagation();
        setShowEnquiryForm(true);
        setDisableScroll(true);
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <Element name='listings'>
            <div className="listings-container">
                <div className="listings-header">
                    <h1>Car Listings</h1>
                    <p>Explore our latest car inventory</p>
                </div>
                {sortedCarsData.map((vehicle, index) => (
                    <ListingItem
                        key={index}
                        vehicle={vehicle}
                        onClick={() => handleListingClick(vehicle)}
                        onClose={handleCloseModal}
                        onEnquireClick={handleFormButtonClick}
                    />
                ))}
                {selectedCar && selectedCar.imageUrls && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-content" onClick={handleModalClick}>
                            <ImageCarousel carDetails={selectedCar} onClose={handleCloseModal} />
                            <div className="enquiry-form-container">
                                {showEnquiryForm && selectedCar && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                    >
                                        <EnquiryForm
                                            vehicle={selectedCar}
                                            onClose={() => setShowEnquiryForm(false)}
                                            isFormVisible={showEnquiryForm}
                                        />
                                    </motion.div>
                                )}
                                {!showEnquiryForm && (
                                    <motion.button
                                        className="enquire-button"
                                        onClick={handleFormButtonClick}
                                    >
                                        Enquire
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <Banner page={1} totalPages={5} onPageChange={(direction) => console.log(direction)} />
            </div>
        </Element>
    );
};

const noCarPhotoImage = <img src={noCarPhoto} alt="No Car Photo Available" className="icon" />;

const ListingItem = ({ vehicle, onClick, onClose, onEnquireClick }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px',
    });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
            });
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            className="vehicle-listing"
            onClick={onClick}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
        >
            <div className='image-container'>
                {vehicle.imageUrls && vehicle.imageUrls.length > 0 ? (
                    <img src={vehicle.imageUrls[0]} alt={`${vehicle.name} Vehicle`} />
                ) : (
                    noCarPhotoImage
                )}
            </div>
            <div className='details-container'>
                <div className='top-details'>
                    <p className='price'>{`R${vehicle.price.toLocaleString()}`}</p>
                </div>
                <div className='bottom-details'>
                    <p className='name'>{vehicle.name}</p>
                    <p className='used-status'>{vehicle.used ? 'Used Car' : 'New Car'}</p>
                    <p className='mileage'>
                        <img src={mileageIcon} alt="Mileage Icon" className="icon" />
                        {vehicle.mileage} km
                    </p>
                    <p className='transmission-type'>
                        <img src={transmissionIcon} alt="Transmission Icon" className="icon" />
                        {vehicle.transmissionType}
                    </p>
                    <p className='fuel-type'>
                        <img src={fuelIcon} alt="Fuel Icon" className="icon" />
                        {vehicle.fuelType}
                    </p>
                    <p className='calendar'>
                        <img src={calendar} alt="Calendar Icon" className="icon" />
                        {vehicle.year} 
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Banner = ({ page, totalPages, onPageChange }) => {
    return (
        <div className="banner-container">
            <button className="arrow-button" onClick={() => onPageChange('prev')}>
                {'<'}
            </button>
            <p className="page-indicator">{`Page ${page} of ${totalPages}`}</p>
            <button className="arrow-button" onClick={() => onPageChange('next')}>
                {'>'}
            </button>
        </div>
    );
};

export default Listings;
