import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaExpand,
  FaCompress,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaSearchPlus,
  FaSearchMinus,
  FaHeart,
  FaPhone,
  FaWhatsapp,
  FaCar,
  FaCalendarAlt,
  FaTachometerAlt,
  FaGasPump,
  FaCog,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

const ImageCarousel = ({ carDetails, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showDetails, setShowDetails] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const imageRef = useRef(null);
  const intervalRef = useRef(null);

  // Use sortedImageUrls if present, else sort here
  const getSortedImageUrls = (urls = []) => {
    return [...urls].sort((a, b) => {
      const getSuffix = (url) => {
        const match = url.match(/_(\d\d)(?=\.|$)/);
        return match ? parseInt(match[1], 10) : 99;
      };
      return getSuffix(a) - getSuffix(b);
    });
  };
  const images =
    carDetails?.sortedImageUrls ||
    getSortedImageUrls(carDetails?.allImageUrls || carDetails?.imageUrls || []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          if (isFullscreen) {
            exitFullscreen();
          } else {
            onClose();
          }
          break;
        case "ArrowLeft":
          handlePrevClick();
          break;
        case "ArrowRight":
          handleNextClick();
          break;
        case " ":
          e.preventDefault();
          toggleSlideshow();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, images.length]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (imageRef.current?.requestFullscreen) {
        imageRef.current.requestFullscreen();
      }
    } else {
      exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying);
  };

  const handleZoom = (direction) => {
    if (direction === "in") {
      setZoom((prev) => Math.min(prev + 0.5, 3));
    } else {
      setZoom((prev) => Math.max(prev - 0.5, 0.5));
    }
  };

  const formatPrice = (price) => {
    if (!price) return "POA";
    return `R${parseInt(price).toLocaleString()}`;
  };

  const formatMileage = (mileage) => {
    if (!mileage) return "N/A";
    return `${parseInt(mileage).toLocaleString()} km`;
  };

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-800 rounded-2xl">
        <p className="text-white text-lg">No images available</p>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black ${
        isFullscreen ? "bg-black" : "bg-black/95"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Top Controls */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-bold text-xl">
              {carDetails.brand} {carDetails.name}
            </h2>
            <span className="px-3 py-1 bg-brand-red rounded-full text-white font-semibold">
              {formatPrice(carDetails.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Image Counter */}
            <span className="text-white/80 text-sm">
              {currentImageIndex + 1} / {images.length}
            </span>

            {/* Controls */}
            <button
              onClick={toggleSlideshow}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isPlaying ? "Pause slideshow" : "Start slideshow"}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button
              onClick={() => handleZoom("out")}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              disabled={zoom <= 0.5}
            >
              <FaSearchMinus />
            </button>

            <button
              onClick={() => handleZoom("in")}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              disabled={zoom >= 3}
            >
              <FaSearchPlus />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Main Image Area */}
        <div className="flex-1 relative flex">
          {/* Image Display */}
          <div
            className={`${
              showDetails ? "flex-1" : "w-full"
            } relative overflow-hidden`}
          >
            <div
              ref={imageRef}
              className="h-full w-full flex items-center justify-center"
            >
              <img
                src={images[currentImageIndex]}
                alt={`${carDetails.brand} ${carDetails.name} - Image ${
                  currentImageIndex + 1
                }`}
                className="max-h-full max-w-full object-contain transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevClick}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                  disabled={currentImageIndex === 0 && !isPlaying}
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextClick}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                  disabled={
                    currentImageIndex === images.length - 1 && !isPlaying
                  }
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Details Panel */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                className="w-96 bg-gray-900 border-l border-gray-700 overflow-y-auto"
              >
                <div className="p-6 space-y-6">
                  {/* Vehicle Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-brand-red/20 text-brand-red text-xs font-semibold rounded">
                        {carDetails.brand}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-red-400">
                        <FaHeart />
                      </button>
                    </div>
                    <h3 className="text-white font-bold text-xl">
                      {carDetails.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{carDetails.year}</span>
                      <span>•</span>
                      <span>{formatMileage(carDetails.mileage)}</span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-brand-red">
                      {formatPrice(carDetails.price)}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-red rounded-lg text-white font-semibold hover:bg-brand-red/80 transition-colors">
                        <FaPhone size={14} />
                        Call
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-500 transition-colors">
                        <FaWhatsapp size={14} />
                        WhatsApp
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-700">
                    <div className="flex space-x-4">
                      {["overview", "specs", "features", "description"].map(
                        (tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                              activeTab === tab
                                ? "text-brand-red border-brand-red"
                                : "text-gray-400 border-transparent hover:text-white"
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-4">
                    {activeTab === "overview" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <FaCalendarAlt className="text-brand-red" />
                            <span className="text-gray-300">
                              Year: {carDetails.year}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FaTachometerAlt className="text-brand-red" />
                            <span className="text-gray-300">
                              Mileage: {formatMileage(carDetails.mileage)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FaGasPump className="text-brand-red" />
                            <span className="text-gray-300">
                              Fuel: {carDetails.fuelType}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <FaCog className="text-brand-red" />
                            <span className="text-gray-300">
                              Transmission: {carDetails.transmissionType}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FaCar className="text-brand-red" />
                            <span className="text-gray-300">
                              Type: {carDetails.vehicleDetails?.bodyType}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-gray-300">
                              {carDetails.vehicleDetails?.serviceHistory ===
                              "Yes"
                                ? "Full Service History"
                                : carDetails.vehicleDetails?.serviceHistory ===
                                  "No"
                                ? "No Service History"
                                : "Service History: Not specified"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "specs" && carDetails.vehicleDetails && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Colour</span>
                          <span className="text-white">
                            {carDetails.vehicleDetails.colour}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Body Type</span>
                          <span className="text-white">
                            {carDetails.vehicleDetails.bodyType}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Previous Owners</span>
                          <span className="text-white">
                            {carDetails.vehicleDetails.previousOwners}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Warranty</span>
                          <span className="text-white">
                            {carDetails.vehicleDetails.warranty}
                          </span>
                        </div>
                      </div>
                    )}

                    {activeTab === "features" && carDetails.extras && (
                      <div className="space-y-2">
                        {carDetails.extras
                          .filter((extra) => extra.trim())
                          .map((extra, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <FaCheckCircle className="text-green-500 text-xs" />
                              <span className="text-gray-300">{extra}</span>
                            </div>
                          ))}
                      </div>
                    )}

                    {activeTab === "description" && (
                      <div className="text-sm text-gray-300 leading-relaxed text-center">
                        {carDetails.sellerComments}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Details Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-all"
          >
            <FaInfoCircle />
          </button>
        </div>

        {/* Thumbnail Strip */}
        {showThumbnails && images.length > 1 && (
          <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-brand-red"
                      : "border-transparent hover:border-white/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
