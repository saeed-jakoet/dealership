import React, { useState, useRef } from 'react';
import { Element, scroller } from 'react-scroll';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaChevronDown, FaChevronUp, FaQuoteLeft, FaGoogle, FaExternalLinkAlt } from 'react-icons/fa';

const allReviews = [
    {
        id: 1,
        author: "Phaedra Tandy",
        rating: 5,
        content: "Today I took delivery of only the 3rd car I've ever owned in 32+ years of driving and from the 1st time I was contacted by Faraaz from FARAUTO it has been an absolute pleasure and seamless process to take ownership of my 'new' wheels! I would highly recommend FARAUTO to anyone who is in the market for buying or selling a vehicle. Their service is personal and professional and they go more than the extra mile to make sure their customers are happy. Thank you Faraaz for everything!",
        url: "https://g.co/kgs/3WLF9e",
        avatar: "PT",
        date: "2 months ago"
    },
    {
        id: 2,
        author: "Faizel Davids",
        rating: 5,
        content: "I have had the pleasure of doing business with Faraaz Khan on 2 occasions when purchasing vehicles. Other agents in his industry can learn a great deal from his level of professionalism & respect for his customers/clients. Not only did he give me the best possible deal on both vehicles I purchased from him, but his after sales service is phenomenal, that is why he is my go-to when it comes to vehicle sales & after sales support.",
        url: "https://g.co/kgs/nYFsG6",
        avatar: "FD",
        date: "3 months ago"
    },
    {
        id: 3,
        author: "Tristan Spies",
        rating: 5,
        content: "Always stellar service. Always helpful. Always willing to go the extra mile. I'm so thankful to of met Faraaz and I honestly wouldn't go anywhere else when it comes to cars. Thanks for all your help man.",
        url: "https://g.co/kgs/BXKnd3",
        avatar: "TS",
        date: "4 months ago"
    },
    {
        id: 4,
        author: "Adam Preston (AdamPrestonVlogs)",
        rating: 5,
        content: "Honestly the best dealership. Love the service offered and Faraaz really knows his cars and his industry. Excited to see where his business goes and you should definitely consider purchasing from him.",
        url: "https://g.co/kgs/BXKnd3",
        avatar: "AP",
        date: "5 months ago"
    },
    {
        id: 5,
        author: "zaahir jattiem",
        rating: 5,
        content: "Honesty and transparency is rare in the motor industry but it is what I receive consistently in my business with Mr Khan and FARAUTO. Will definitely keep continuing doing business with and highly recommend FARAUTO 👌",
        url: "https://g.co/kgs/fZYdtJ",
        avatar: "ZJ",
        date: "6 months ago"
    },
    {
        id: 6,
        author: "Tasnim Abrahams",
        rating: 5,
        content: "Excellent service received by Faraz and his team! Bought a car without having to leave my house, trusted their judgment and they delivered above and beyond! All the success to the team👏",
        url: "https://g.co/kgs/yPZJga",
        avatar: "TA",
        date: "7 months ago"
    },
    {
        id: 7,
        author: "Dirk Schoeman",
        rating: 5,
        content: "Great service! Very professional and helpful through the whole process.",
        url: "https://g.co/kgs/b3rWw2",
        avatar: "DS",
        date: "8 months ago"
    },
    {
        id: 8,
        author: "arnold liemens",
        rating: 5,
        content: "Incredible that's all I can say from start to finish and after service these guys are great make you feel extra special with their approach and proffesionism I speak for myself but anyone if you want to buy a car buy it from these guys I promise you you will feel extra special.Continue on this journey guys and I will keep my promise that the next car I buy will definitely be from you guys 👌👍👏",
        url: "https://g.co/kgs/41qDec",
        avatar: "AL",
        date: "10 months ago"
    },
    {
        id: 9,
        author: 'Yanda Ntsaluba',
        rating: 5,
        content: 'Dealing with Faraaz was so good. Courteous, service top-notch, and great selection of cars. Thanks Faraaz, as well as Angie, on making the whole process easier than buying groceries. Anyone looking for a new car, start here. You won\'t need to look anywhere else.',
        url: 'https://g.co/kgs/RYZHj5N',
        avatar: "YN",
        date: "11 months ago"
    },
    {
        id: 10,
        author: 'Rachie du Preez',
        rating: 5,
        content: 'Best service ever',
        url: 'https://g.co/kgs/QUNSaJM',
        avatar: "RD",
        date: "1 year ago"
    }
];

const Review = ({ review, index }) => {
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
            onClick={() => window.open(review.url, "_blank")}
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

                {/* Google Badge */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <FaGoogle className="text-blue-400 text-sm" />
                    <span className="text-xs text-gray-300">Google</span>
                </div>
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
                
                {/* Read More Link */}
                <div className="flex items-center gap-2 text-brand-red hover:text-brand-accent-gold transition-colors duration-300">
                    <span className="text-sm font-medium">Read on Google</span>
                    <FaExternalLinkAlt className="text-xs" />
                </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-red/0 via-brand-red/5 to-brand-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

const Reviews = () => {
    const [displayCount, setDisplayCount] = useState(6);
    const [expanded, setExpanded] = useState(false);
    const reviewsRef = useRef(null);
    const isInView = useInView(reviewsRef, { once: true, margin: "-100px" });

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

    const averageRating = (allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length).toFixed(1);
    
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
                        animate={isInView ? "visible" : "hidden"}
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
                        animate={isInView ? "visible" : "hidden"}
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
                            animate={isInView ? "visible" : "hidden"}
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