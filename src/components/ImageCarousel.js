// ImageCarousel.js
import React, { useState } from 'react';

const ImageCarousel = ({ carDetails, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(true); // Change the initial state to false

    const handlePrevClick = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : carDetails.imageUrls.length - 1));
    };

    const handleNextClick = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex < carDetails.imageUrls.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className={`image-carousel ${showDetails ? 'show-details' : ''}`} onClick={() => setShowDetails(true)}>
            {carDetails && carDetails.imageUrls && carDetails.imageUrls.length > 0 && (
                <>
                    <button className="carousel-button prev" onClick={handlePrevClick}>
                        &lt;
                    </button>
                    <img src={carDetails.imageUrls[currentImageIndex]} alt="Car" className="carousel-image" />
                    <button className="carousel-button next" onClick={handleNextClick}>
                        &gt;
                    </button>
                    <button className="close-button" onClick={onClose}>
                        Close
                    </button>
                    <p className="image-counter">{`Image ${currentImageIndex + 1} of ${carDetails.imageUrls.length}`}</p>
                </>
            )}
            <div className="car-details-container">
                <div className="styled-details">
                    {carDetails.sellerComments && (
                        <>
                            <h2 className="section-title">Description</h2>
                            <p className="section-content">{carDetails.sellerComments}</p>
                        </>
                    )}
                    {carDetails.vehicleDetails && (
                        <>
                            <h2 className="section-title">Vehicle Details</h2>
                            <div className="details-info">
                                <p>{`Last Updated: ${carDetails.vehicleDetails.lastUpdated}`}</p>
                                <p>{`Previous Owners: ${carDetails.vehicleDetails.previousOwners}`}</p>
                                <p>{`Service History: ${carDetails.vehicleDetails.serviceHistory}`}</p>
                                <p>{`Colour: ${carDetails.vehicleDetails.colour}`}</p>
                                <p>{`Body Type: ${carDetails.vehicleDetails.bodyType}`}</p>
                            </div>
                        </>
                    )}
                    {carDetails.extras && carDetails.extras.length > 0 && (
                        <>
                            <h2 className="section-title">Extras</h2>
                            <div className="extras-list">
                                {carDetails.extras.map((extra, index) => (
                                    <p key={index} className="extra-item">
                                        {extra}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
