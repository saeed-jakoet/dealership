// ImageCarousel.js
import React, { useState } from 'react';

const ImageCarousel = ({ images, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextClick = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className="image-carousel">
            {images.length > 0 && (
                <>
                    <button className="carousel-button prev" onClick={handlePrevClick}>
                        &lt;
                    </button>
                    <img src={images[currentImageIndex]} alt="Car" className="carousel-image" />
                    <button className="carousel-button next" onClick={handleNextClick}>
                        &gt;
                    </button>
                    <button className="close-button" onClick={onClose}>
                        Close
                    </button>
                    <p className="image-counter">{`Image ${currentImageIndex + 1} of ${images.length}`}</p>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;
