import React, { useState, useRef, useEffect } from 'react';
import { Element, scroller } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaStar, FaChevronDown, FaChevronUp, FaQuoteLeft, FaGoogle, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import { apiGet } from '../../api/client';

// Helper function to generate avatar initials
const generateAvatar = (name) => {
    if (!name || typeof name !== 'string') {
        return 'NA'; // Default avatar for missing names
    }

    return name
        .trim()
        .split(' ')
        .filter(word => word.length > 0) // Filter out empty strings
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'NA'; // Fallback to 'NA' if no valid characters
};

// Helper function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 60) return '1 month ago';
    if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
};

// Transform API data to component format
const transformReviewData = (apiReviews) => {
    try {
        if (!Array.isArray(apiReviews)) {
            console.warn('Expected array of reviews, got:', apiReviews);
            return [];
        }

        console.log('Processing', apiReviews.length, 'reviews from API');

        const transformedReviews = apiReviews
            .filter(review => {
                // Must have at least an ID - API already filters hidden reviews
                if (!review || !review._id) {
                    console.warn('Skipping review without ID:', review);
                    return false;
                }
                return true;
            })
            .map(review => {
                try {
                    return {
                        id: review._id,
                        author: review.name || 'Anonymous', // Fallback to Anonymous if no name
                        rating: Math.max(1, Math.min(5, Number(review.rating) || 5)), // Default to 5 stars if no rating
                        content: review.comment || 'No comment provided', // Fallback content
                        url: `#review-${review._id}`,
                        avatar: generateAvatar(review.name || 'Anonymous'),
                        date: formatDate(review.createdAt || review.updatedAt || new Date()),
                        createdAt: review.createdAt || review.updatedAt || new Date() // Keep for sorting
                    };
                } catch (mapError) {
                    console.error('Error transforming review:', review, mapError);
                    return null;
                }
            })
            .filter(review => review !== null) // Remove any failed transformations
            .sort((a, b) => {
                try {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA; // Sort by newest first
                } catch (sortError) {
                    console.error('Error sorting reviews:', sortError);
                    return 0;
                }
            });

        console.log('Successfully transformed', transformedReviews.length, 'reviews');
        return transformedReviews;
    } catch (error) {
        console.error('Critical error in transformReviewData:', error);
        return []; // Return empty array to prevent component crash
    }
};

const Review = ({ review, index }) => {
    const isGoogleReview = review.url && review.url.includes('g.co');

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
            className="group relative p-8 rounded-3xl bg-glass-gradient backdrop-blur-sm border border-white/10 hover:border-brand-red/30 transition-all duration-500 cursor-pointer overflow-hidden"
            onClick={() => {
                if (isGoogleReview) {
                    window.open(review.url, "_blank");
                }
            }}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-brand-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-brand-red/20 group-hover:text-brand-red/40 transition-colors duration-300">
                <FaQuoteLeft className="text-3xl" />
            </div>

            {/* Header */}
            <div className="relative flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-red to-brand-accent-gold flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform duration-300">
                        {review.avatar}
                    </div>

                    {/* Author Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg group-hover:text-brand-accent-gold transition-colors duration-300">
                            {review.author}
                        </h4>
                        <p className="text-gray-400 text-sm">{review.date}</p>
                    </div>
                </div>

                {/* Google Badge - Only show for Google reviews */}
                {isGoogleReview && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                        <FaGoogle className="text-blue-400 text-sm" />
                        <span className="text-xs text-gray-300">Google</span>
                    </div>
                )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            delay: index * 0.1 + i * 0.1,
                            duration: 0.3,
                            ease: "easeOut"
                        }}
                    >
                        <FaStar className="text-brand-accent-gold text-lg" />
                    </motion.div>
                ))}
            </div>

            {/* Content */}
            <div className="relative">
                <p className="text-gray-300 leading-relaxed mb-4 line-clamp-4 group-hover:text-white transition-colors duration-300">
                    {review.content}
                </p>

                {/* Read More Link - Only show for Google reviews */}
                {isGoogleReview && (
                    <div className="flex items-center gap-2 text-brand-red hover:text-brand-accent-gold transition-colors duration-300">
                        <span className="text-sm font-medium">Read on Google</span>
                        <FaExternalLinkAlt className="text-xs" />
                    </div>
                )}
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-red/0 via-brand-red/5 to-brand-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

const Reviews = () => {
    const [displayCount, setDisplayCount] = useState(6);
    const [expanded, setExpanded] = useState(false);
    const [allReviews, setAllReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const reviewsRef = useRef(null);

    // Fetch reviews from API
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await apiGet('/reviews/public', { timeout: 15000 });

                if (response && response.status === 'success' && Array.isArray(response.data) && response.data.length > 0) {
                    const transformedReviews = transformReviewData(response.data);
                    setAllReviews(transformedReviews);
                } else {
                    setAllReviews([]);
                }
            } catch (err) {
                console.error('Failed to load reviews:', err);
                setError(err.message);
                setAllReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handleToggleReviews = () => {
        if (expanded) {
            setDisplayCount(6);
            setExpanded(false);
            scroller.scrollTo('reviews', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            });
        } else {
            setDisplayCount(allReviews.length);
            setExpanded(true);
        }
    };

    const averageRating = allReviews.length > 0
        ? (allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length).toFixed(1)
        : '0.0';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Loading state
    if (loading) {
        return (
            <Element name="reviews">
                <section className="relative py-20 bg-gradient-to-b from-black via-brand-gray-dark to-black overflow-hidden">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6">
                                <FaStar className="text-brand-accent-gold" />
                                <span className="text-sm font-medium tracking-wide text-white/90">CUSTOMER TESTIMONIALS</span>
                            </div>
                            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                What Our{' '}
                                <span className="bg-gradient-to-r from-brand-red to-brand-accent-gold bg-clip-text text-transparent">
                                    Customers Say
                                </span>
                            </h2>
                            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-glass-gradient backdrop-blur-sm border border-white/10 mt-4">
                                <FaSpinner className="text-brand-red animate-spin" />
                                <span className="text-white font-medium">Loading reviews...</span>
                            </div>
                        </div>
                    </div>
                </section>
            </Element>
        );
    }

    // Error state
    if (error) {
        return (
            <Element name="reviews">
                <section className="relative py-20 bg-gradient-to-b from-black via-brand-gray-dark to-black overflow-hidden">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6">
                                <FaStar className="text-brand-accent-gold" />
                                <span className="text-sm font-medium tracking-wide text-white/90">CUSTOMER TESTIMONIALS</span>
                            </div>
                            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                What Our{' '}
                                <span className="bg-gradient-to-r from-brand-red to-brand-accent-gold bg-clip-text text-transparent">
                                    Customers Say
                                </span>
                            </h2>
                            <p className="text-gray-400 mt-4">Unable to load reviews right now. Please try refreshing.</p>
                        </div>
                    </div>
                </section>
            </Element>
        );
    }

    // Empty state (no reviews or all are hidden)
    if (allReviews.length === 0) {
        return (
            <Element name="reviews">
                <section className="relative py-20 bg-gradient-to-b from-black via-brand-gray-dark to-black overflow-hidden">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6">
                                <FaStar className="text-brand-accent-gold" />
                                <span className="text-sm font-medium tracking-wide text-white/90">CUSTOMER TESTIMONIALS</span>
                            </div>
                            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                What Our{' '}
                                <span className="bg-gradient-to-r from-brand-red to-brand-accent-gold bg-clip-text text-transparent">
                                    Customers Say
                                </span>
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-4">
                                No reviews available at the moment. Check back soon!
                            </p>
                        </div>
                    </div>
                </section>
            </Element>
        );
    }

    return (
        <Element name="reviews">
            <section
                ref={reviewsRef}
                className="relative py-20 bg-gradient-to-b from-black via-brand-gray-dark to-black overflow-hidden"
            >
                {/* Background Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-brand-red/10 to-brand-accent-gold/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-brand-accent-gold/10 to-brand-red/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6"
                        >
                            <FaStar className="text-brand-accent-gold" />
                            <span className="text-sm font-medium tracking-wide text-white/90">CUSTOMER TESTIMONIALS</span>
                        </motion.div>

                        <motion.h2
                            variants={itemVariants}
                            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                            What Our{' '}
                            <span className="bg-gradient-to-r from-brand-red to-brand-accent-gold bg-clip-text text-transparent">
                                Customers Say
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
                        >
                            Don't just take our word for it. Here's what our valued customers have to say about their experience with FARAUTO.
                        </motion.p>

                        {/* Overall Rating */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center gap-6 p-6 rounded-2xl bg-glass-gradient backdrop-blur-sm border border-white/10 max-w-md mx-auto"
                        >
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">{averageRating}</div>
                                <div className="flex justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-brand-accent-gold text-lg" />
                                    ))}
                                </div>
                                <p className="text-gray-400 text-sm">Based on {allReviews.length} reviews</p>
                            </div>

                            <div className="h-16 w-px bg-white/20" />

                            <div className="text-center">
                                <div className="text-2xl font-bold text-brand-red mb-2">100%</div>
                                <p className="text-gray-400 text-sm">Satisfaction<br />Rate</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Reviews Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    >
                        {allReviews.slice(0, displayCount).map((review, index) => (
                            <Review key={review.id} review={review} index={index} />
                        ))}
                    </motion.div>

                    {/* Toggle Button */}
                    {allReviews.length > 6 && (
                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.button
                                onClick={handleToggleReviews}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-full text-white font-medium hover:from-brand-red/20 hover:to-brand-red/10 hover:border-brand-red/30 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {expanded ? (
                                    <>
                                        <FaChevronUp className="text-lg group-hover:text-brand-red transition-colors" />
                                        <span>Show Less</span>
                                    </>
                                ) : (
                                    <>
                                        <span>View All Reviews</span>
                                        <FaChevronDown className="text-lg group-hover:text-brand-red transition-colors" />
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </section>
        </Element>
    );
};

export default Reviews;