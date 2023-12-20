// Listings.js (updated)
import React, { useState, useEffect, useRef } from 'react';
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
    const carsPerPage = 4;
    const [selectedCar, setSelectedCar] = useState(null);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [disableScroll, setDisableScroll] = useState(false);
    const [page, setPage] = useState(1);

    const listingsRef = useRef(null);

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

    const handlePageChange = (direction) => {
        const listingsOffsetTop = listingsRef.current.offsetTop;
    
        if (direction === 'prev' && page > 1) {
            window.scrollTo({ top: listingsOffsetTop, behavior: 'smooth' });
            setTimeout(() => {
                setPage(page - 1);
            }, 500); // Delay setting the page by 500 milliseconds
        } else if (direction === 'next' && page < Math.ceil(carsData.length / carsPerPage)) {
            window.scrollTo({ top: listingsOffsetTop, behavior: 'smooth' });
            setTimeout(() => {
                setPage(page + 1);
            }, 500); // Delay setting the page by 500 milliseconds
        }
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

    useEffect(() => {
        if (listingsRef.current && page > 1) {
            listingsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [page]);

    const handleFormButtonClick = (e) => {
        e.stopPropagation();
        setShowEnquiryForm(true);
        setDisableScroll(true);
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const filteredCars = carsData
        .sort((a, b) => a.brand.localeCompare(b.brand)) // Sort alphabetically by brand
        .slice((page - 1) * carsPerPage, page * carsPerPage); // Paginate cars

    return (
        <Element name='listings'>
            <div className="listings-container" ref={listingsRef}>
                <div className="listings-header">
                    <h1>Car Listings</h1>
                    <p>Explore our latest car inventory</p>
                </div>
                {filteredCars.map((vehicle, index) => (
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
                <Banner page={page} totalPages={Math.ceil(carsData.length / carsPerPage)} onPageChange={handlePageChange} />
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
            <button className="arrow-button" onClick={() => onPageChange('prev')} disabled={page === 1}>
                {'<'}
            </button>
            <p className="page-indicator">{`Page ${page} of ${totalPages}`}</p>
            <button className="arrow-button" onClick={() => onPageChange('next')} disabled={page === totalPages}>
                {'>'}
            </button>
        </div>
    );
};

export default Listings;
