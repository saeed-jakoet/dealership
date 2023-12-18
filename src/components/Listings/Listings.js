// Listings.js
import React, { useState, useEffect, useMemo } from 'react';
import { Element } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Listings.css';
import { carsData } from '../carsData';
import ImageCarousel from '../ImageCarousel';
import EnquiryForm from './EnquiryForm';
import { MdEvent, MdLocalGasStation, MdOutlineDriveEta, MdSpeed } from 'react-icons/md';

import noCarPhoto from '../images/nophotocar.jpg';

const Listings = () => {
    const [selectedCar, setSelectedCar] = useState(null);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [disableScroll, setDisableScroll] = useState(false);
    const [sortOption, setSortOption] = useState('');

    const sortedCarsData = useMemo(() => {
        let sortedData = [...carsData];
        switch (sortOption) {
            case 'brandAsc':
                sortedData.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case 'brandDesc':
                sortedData.sort((a, b) => b.brand.localeCompare(a.brand));
                break;
            case 'priceHighLow':
                sortedData = [...carsData].sort((a, b) => {
                    return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
                });
                break;
            case 'priceLowHigh':
                sortedData = [...carsData].sort((a, b) => {
                    return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
                });
                break;
            case 'mileageHighLow':
                sortedData.sort((a, b) => parseInt(b.mileage, 10) - parseInt(a.mileage, 10));
                break;
            default:
                sortedData.sort((a, b) => a.brand.localeCompare(b.brand));
        }
        return sortedData;
    }, [sortOption]);


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
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-dropdown">
                        <option value="" disabled>Sort by</option>
                        <option value="brandAsc">Brand A-Z</option>
                        <option value="brandDesc">Brand Z-A</option>
                        <option value="priceHighLow">Price High-Low</option>
                        <option value="priceLowHigh">Price Low-High</option>
                        <option value="mileageLowHigh">Mileage Low-High</option>
                        <option value="mileageHighLow">Mileage High-Low</option>
                    </select>
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
                        <MdSpeed className="icon" /> {/* React icon for mileage */}
                        {vehicle.mileage} km
                    </p>
                    <p className='transmission-type'>
                        <MdOutlineDriveEta className="icon" /> {/* React icon for transmission */}
                        {vehicle.transmissionType}
                    </p>
                    <p className='fuel-type'>
                        <MdLocalGasStation className="icon" /> {/* React icon for fuel */}
                        {vehicle.fuelType}
                    </p>
                    <p className='calendar'>
                        <MdEvent className="icon" /> {/* React icon for calendar */}
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
