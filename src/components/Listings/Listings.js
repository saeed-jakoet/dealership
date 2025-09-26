import React, { useState, useEffect, useRef } from 'react';
import { Element } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchVehicles } from '../../api/vehicles';
import ImageCarousel from '../ImageCarousel';
import EnquiryForm from './EnquiryForm';
import { MdFilterList, MdGridView, MdViewList, MdSearch } from 'react-icons/md';
import { FaHeart, FaEye, FaChevronLeft, FaChevronRight, FaTachometerAlt, FaCalendarAlt, FaGasPump, FaCog } from 'react-icons/fa';

import noCarPhoto from '../images/nophotocar.jpg';

const Listings = () => {
  const carsPerPage = 8;
  const [selectedCar, setSelectedCar] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [disableScroll, setDisableScroll] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('grid'); // 'grid' or 'list'

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
    } else if (
      direction === 'next' &&
      page < Math.ceil(total / carsPerPage)
    ) {
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

  useEffect(() => {
    let isCancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchVehicles({ page, pageSize: carsPerPage, query });
        console.log(data)
        if (isCancelled) return;
        // Handle the new API response structure: {status, message, data: [...]}
        const items = Array.isArray(data.data) ? data.data : 
                      Array.isArray(data.items) ? data.items : 
                      Array.isArray(data) ? data : [];
        const count = typeof data.total === 'number' ? data.total : items.length;
        
        // Sort vehicles by brand name
        const sortedItems = items.sort((a, b) => a.brand.localeCompare(b.brand));
        
        setVehicles(sortedItems);
        setTotal(count);
      } catch (e) {
        if (!isCancelled) setError(e.message || 'Failed to load vehicles');
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    load();
    return () => { isCancelled = true; };
  }, [page, query]);

  const handleFormButtonClick = (e) => {
    e.stopPropagation();
    setShowEnquiryForm(true);
    setDisableScroll(true);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Utility to sort image URLs by filename suffix (_00, _01, ...)
  const getSortedImageUrls = (urls = []) => {
    return [...urls].sort((a, b) => {
      const getSuffix = (url) => {
        const match = url.match(/_(\d\d)(?=\.|$)/);
        return match ? parseInt(match[1], 10) : 99;
      };
      return getSuffix(a) - getSuffix(b);
    });
  };

  // Attach sortedImageUrls to each vehicle
  const vehiclesWithSortedImages = vehicles.map(v => ({
    ...v,
    sortedImageUrls: getSortedImageUrls(v.allImageUrls || v.imageUrls || [])
  }));

  // Filter by brand, name, or keyword (case-insensitive)
  const filteredCars = vehiclesWithSortedImages.filter(v => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (v.brand && v.brand.toLowerCase().includes(q)) ||
      (v.name && v.name.toLowerCase().includes(q)) ||
      (v.vehicleDetails?.bodyType && v.vehicleDetails.bodyType.toLowerCase().includes(q)) ||
      (v.extras && v.extras.some(extra => extra.toLowerCase().includes(q)))
    );
  });


  return (
    <Element name='listings'>
      <section ref={listingsRef} className="relative py-20 bg-gradient-to-b from-black via-brand-gray-dark to-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6">
              <FaEye className="text-brand-red" />
              <span className="text-sm font-medium tracking-wide text-white/90">VEHICLE SHOWROOM</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Premium{' '}
              <span className="bg-gradient-to-r from-brand-red to-brand-accent-gold bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Discover exceptional vehicles handpicked for quality, performance, and style
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 p-6 rounded-2xl bg-glass-gradient backdrop-blur-sm border border-white/10">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type='text'
                    placeholder='Search by make, model, or keyword...'
                    value={query}
                    onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Filter Button */}
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 border border-white/20 text-white hover:from-brand-red/30 hover:to-brand-accent-gold/30 transition-all duration-300">
                  <MdFilterList className="text-lg" />
                  <span className="font-medium">Filters</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-400">
              {loading ? 'Loading...' : `${total} vehicles found`}
            </p>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 p-1 rounded-lg bg-white/10 backdrop-blur-sm">
              <button
                className={`p-2 rounded-md ${view === 'grid' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <MdGridView />
              </button>
              <button
                className={`p-2 rounded-md ${view === 'list' ? 'bg-brand-red text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <MdViewList />
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              className='mb-8 p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Vehicle Grid/List */}
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {loading && Array.from({ length: carsPerPage }).map((_, i) => (
                <div key={i} className="group">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 animate-pulse mb-4" />
                  <div className="space-y-3">
                    <div className="h-6 bg-white/10 rounded animate-pulse" />
                    <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
                    <div className="flex gap-2">
                      <div className="h-8 bg-white/10 rounded animate-pulse flex-1" />
                      <div className="h-8 bg-white/10 rounded animate-pulse flex-1" />
                    </div>
                  </div>
                </div>
              ))}
              {!loading && !error && filteredCars.map((vehicle, index) => (
                <ListingItem
                  key={index}
                  vehicle={vehicle}
                  onClick={() => handleListingClick(vehicle)}
                  onClose={handleCloseModal}
                  onEnquireClick={handleFormButtonClick}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6 mb-16">
              {loading && Array.from({ length: carsPerPage }).map((_, i) => (
                <div key={i} className="group flex gap-6 p-6 bg-white/5 rounded-2xl animate-pulse" />
              ))}
              {!loading && !error && filteredCars.map((vehicle, index) => (
                <div key={index} className="bg-glass-gradient rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 p-6 hover:shadow-card-hover transition-all duration-300 cursor-pointer" onClick={() => handleListingClick(vehicle)}>
                  <div className="w-full md:w-1/3 flex-shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
                    {vehicle.sortedImageUrls && vehicle.sortedImageUrls.length > 0 ? (
                      <img src={vehicle.sortedImageUrls[0]} alt={`${vehicle.brand} ${vehicle.name}`} className="w-full h-full object-cover" />
                    ) : (
                      <img src={noCarPhoto} alt='No Car Available' className='w-20 h-20 opacity-50' />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-2 justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-white/20 rounded text-xs font-semibold text-white uppercase tracking-wide">{vehicle.brand}</span>
                        <span className="text-brand-red font-bold text-lg">{vehicle.name}</span>
                        <span className="ml-auto text-brand-red font-bold text-lg">{vehicle.price ? `R${parseInt(vehicle.price).toLocaleString()}` : 'POA'}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-2">
                        <span><FaCalendarAlt className="inline mr-1 text-brand-red" />{vehicle.year}</span>
                        <span><FaTachometerAlt className="inline mr-1 text-brand-red" />{vehicle.mileage ? `${parseInt(vehicle.mileage).toLocaleString()} km` : 'N/A'}</span>
                        <span><FaGasPump className="inline mr-1 text-brand-red" />{vehicle.fuelType}</span>
                        <span><FaCog className="inline mr-1 text-brand-red" />{vehicle.transmissionType}</span>
                        <span>{vehicle.vehicleDetails?.bodyType}</span>
                        <span>{vehicle.vehicleDetails?.serviceHistory}</span>
                      </div>
                      {vehicle.extras && vehicle.extras.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {vehicle.extras.slice(0, 5).map((extra, i) => (
                            <span key={i} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 truncate">{extra}</span>
                          ))}
                          {vehicle.extras.length > 5 && (
                            <span className="px-2 py-1 bg-brand-red/20 rounded-full text-xs text-brand-red">+{vehicle.extras.length - 5} more</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 bg-gradient-to-r from-brand-red to-brand-red-dark rounded-xl text-white font-semibold hover:scale-105 transition-all" onClick={(e) => { e.stopPropagation(); handleListingClick(vehicle); }}>View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vehicle Modal */}
          {selectedCar && selectedCar.sortedImageUrls && (
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm' onClick={handleCloseModal}>
              <div className='relative w-full max-w-6xl max-h-[90vh] bg-brand-gray-dark rounded-3xl overflow-hidden shadow-2xl' onClick={handleModalClick}>
                <ImageCarousel
                  carDetails={selectedCar}
                  onClose={handleCloseModal}
                />
                <div className='p-6'>
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
                      className='w-full px-8 py-4 bg-gradient-to-r from-brand-red to-brand-red-dark rounded-xl font-semibold text-white shadow-lg hover:shadow-brand-red/25 transition-all duration-300 hover:scale-105'
                      onClick={handleFormButtonClick}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get In Touch
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          <Banner
            page={page}
            totalPages={Math.ceil(total / carsPerPage) || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </Element>
  );
};

const noCarPhotoImage = (
  <img src={noCarPhoto} alt='No Car Available' className='icon' />
);

const ListingItem = ({ vehicle, onClick, onClose, onEnquireClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-50px 0px',
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  const formatPrice = (price) => {
    if (!price) return 'POA';
    return `R${parseInt(price).toLocaleString()}`;
  };

  const formatMileage = (mileage) => {
    if (!mileage) return 'N/A';
    return `${parseInt(mileage).toLocaleString()} km`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-glass-gradient backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-glass hover:shadow-card-hover transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {vehicle.sortedImageUrls && vehicle.sortedImageUrls.length > 0 ? (
          <img 
            src={vehicle.sortedImageUrls[0]} 
            alt={`${vehicle.brand} ${vehicle.name}`} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
            <img src={noCarPhoto} alt='No Car Available' className='w-20 h-20 opacity-50' />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Brand Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <span className="text-white font-semibold text-xs uppercase tracking-wide">
            {vehicle.brand}
          </span>
        </div>

        {/* Favorite Button */}
        <motion.button
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
            isFavorite ? 'bg-brand-red text-white' : 'bg-black/20 text-white/60 hover:text-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <FaHeart className="text-sm" />
        </motion.button>

        {/* Image Count Badge */}
        {vehicle.sortedImageUrls && vehicle.sortedImageUrls.length > 1 && (
          <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/60 backdrop-blur-sm">
            <span className="text-white text-xs font-medium">
              +{vehicle.sortedImageUrls.length} photos
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-brand-red to-brand-red-dark rounded-full text-white font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            View Details
          </motion.button>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6 space-y-4">
        {/* Title and Price */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg group-hover:text-brand-accent-gold transition-colors line-clamp-1">
              {vehicle.name}
            </h3>
            <span className="text-brand-red font-bold text-lg">
              {formatPrice(vehicle.price)}
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            {vehicle.year} • {vehicle.vehicleDetails?.bodyType || 'Vehicle'}
          </p>
        </div>

        {/* Key Specs Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <FaTachometerAlt className="text-brand-red text-xs" />
              <span>{formatMileage(vehicle.mileage)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <FaGasPump className="text-brand-red text-xs" />
              <span>{vehicle.fuelType}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <FaCog className="text-brand-red text-xs" />
              <span>{vehicle.transmissionType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs">{vehicle.vehicleDetails?.serviceHistory || 'Service History'}</span>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        {vehicle.extras && vehicle.extras.length > 0 && (
          <div className="space-y-2">
            <p className="text-gray-400 text-xs font-medium">Key Features:</p>
            <div className="flex flex-wrap gap-1">
              {vehicle.extras.slice(0, 3).map((extra, index) => (
                <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 truncate">
                  {extra}
                </span>
              ))}
              {vehicle.extras.length > 3 && (
                <span className="px-2 py-1 bg-brand-red/20 rounded-full text-xs text-brand-red">
                  +{vehicle.extras.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2">
          <motion.button
            className="flex-1 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl text-white font-medium hover:from-brand-red/20 hover:to-brand-red/10 hover:border-brand-red/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </motion.button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-red/0 via-brand-red/5 to-brand-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const Banner = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <motion.button
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          page === 1 
            ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-brand-red/20 to-brand-red/10 border border-brand-red/30 text-white hover:from-brand-red/30 hover:to-brand-red/20'
        }`}
        onClick={() => onPageChange('prev')}
        disabled={page === 1}
        whileHover={page !== 1 ? { scale: 1.05, x: -2 } : {}}
        whileTap={page !== 1 ? { scale: 0.95 } : {}}
      >
        <FaChevronLeft className="text-sm" />
        <span>Previous</span>
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === page;
          
          // Show current, previous, next, first and last pages
          if (
            pageNumber === 1 || 
            pageNumber === totalPages || 
            Math.abs(pageNumber - page) <= 1
          ) {
            return (
              <motion.button
                key={pageNumber}
                className={`w-12 h-12 rounded-xl font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-brand-red to-brand-red-dark text-white shadow-lg' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
                onClick={() => onPageChange(pageNumber > page ? 'next' : 'prev')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {pageNumber}
              </motion.button>
            );
          } else if (pageNumber === page - 2 || pageNumber === page + 2) {
            return <span key={pageNumber} className="text-gray-500">...</span>;
          }
          return null;
        })}
      </div>

      <motion.button
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          page === totalPages 
            ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-brand-red/20 to-brand-red/10 border border-brand-red/30 text-white hover:from-brand-red/30 hover:to-brand-red/20'
        }`}
        onClick={() => onPageChange('next')}
        disabled={page === totalPages}
        whileHover={page !== totalPages ? { scale: 1.05, x: 2 } : {}}
        whileTap={page !== totalPages ? { scale: 0.95 } : {}}
      >
        <span>Next</span>
        <FaChevronRight className="text-sm" />
      </motion.button>
    </div>
  );
};

export default Listings;
