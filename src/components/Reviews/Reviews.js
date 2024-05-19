import React, { useState } from 'react';
import './Reviews.css';
import { Element, scroller } from 'react-scroll';
import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

const allReviews = [
    {
        id: 1,
        author: "Phaedra Tandy",
        rating: 5,
        content: "Today I took delivery of only the 3rd car I've ever owned in 32+ years of driving and from the 1st time I was contacted by Faraaz from FARAUTO it has been an absolute pleasure and seamless process to take ownership of my 'new' wheels!  I would highly recommend FARAUTO to anyone who is in the market for buying or selling a vehicle.  Their service is personal and professional and they go more than the extra mile to make sure their customers are happy. Thank you Faraaz for everything!",
        url: "https://g.co/kgs/3WLF9e",
    },
    {
        id: 2,
        author: "Faizel Davids",
        rating: 5,
        content: "I have had the pleasure of doing business with Faraaz Khan on 2 occasions when purchasing vehicles. Other agents in his industry can learn a great deal from his level of professionalism & respect for his customers/clients. Not only did he give me the best possible deal on both vehicles I purchased from him, but his after sales service is phenomenal, that is why he is my go-to when it comes to vehicle sales & after sales support.",
        url: "https://g.co/kgs/nYFsG6",
    },
    {
        id: 3,
        author: "Tristan Spies",
        rating: 5,
        content: "Always stellar service. Always helpful. Always willing to go the extra mile. I’m so thankful to of met Faraaz and I honestly wouldn’t go anywhere else when it comes to cars. Thanks for all your help man.",
        url: "https://g.co/kgs/BXKnd3",
    },
    {
        id: 4,
        author: "Adam Preston (AdamPrestonVlogs)",
        rating: 5,
        content: "Honestly the best dealership. Love the service offered and Faraaz really knows his cars and his industry. Excited to see where his business goes and you should definitely consider purchasing from him.",
        url: "https://g.co/kgs/BXKnd3"
    },
    {
        id: 5,
        author: "zaahir jattiem",
        rating: 5,
        content: "Honesty and transparency is rare in the motor industry but it is what I receive consistently in my business with Mr Khan and FARAUTO. Will definitely keep continuing doing business with and highly recommend FARAUTO 👌",
        url: "https://g.co/kgs/fZYdtJ",
    },
    {
        id: 6,
        author: "Tasnim Abrahams",
        rating: 5,
        content: "Excellent service received by Faraz and his team! Bought a car without having to leave my house, trusted their judgment and they delivered above and beyond! All the success to the team👏",
        url: "https://g.co/kgs/yPZJga",
    },
    {
        id: 7,
        author: "Dirk Schoeman",
        rating: 5,
        content: "Great service! Very professional and helpful through the whole process.",
        url: "https://g.co/kgs/b3rWw2",
    },
    {
        id: 8,
        author: "arnold liemens",
        rating: 5,
        content: "Incredible that's all I can say from start to finish and after service these guys are great make you feel extra special with their approach and proffesionism I speak for myself but anyone if you want to buy a car buy it from these guys I promise you you will feel extra special.Continue on this journey guys and I will keep my promise that the next car I buy will definitely be from you guys 👌👍👏 ",
        url: "https://g.co/kgs/41qDec",
    },
    {
        id:9,
        author: 'Yanda Ntsaluba',
        rating: 5,
        content: 'Dealing with Faraaz was so good. Courteous, service top-notch, and great selection of cars. Thanks Faraaz, as well as Angie, on making the whole process easier than buying groceries. Anyone looking for a new car, start here. You won\'t need to look anywhere else.',
        url: 'https://g.co/kgs/RYZHj5N'
    },
    {
        iid: 10,
        author: 'Rachie du Preez',
        rating: 5,
        content: 'Best service ever',
        url: 'https://g.co/kgs/QUNSaJM'
    }

];

const Review = ({ review }) => (
    <motion.div
        className="review"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => window.open(review.url, "_blank")}
    >
        <div className="review-header">
            <h4>{review.author}</h4>
            <div className="review-rating">{review.rating} <span>★</span></div>
        </div>
        <p>{review.content}</p>
    </motion.div>
);

const Reviews = () => {
    const [reviews, setReviews] = useState(allReviews.slice(0, 3));
    const [expanded, setExpanded] = useState(false);

    const handleToggleReviews = () => {
        if (expanded) {
            setReviews(allReviews.slice(0, 3));
            setExpanded(false);
        } else {
            setReviews(allReviews);
            setExpanded(true);

            scroller.scrollTo('allReviews', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            });
        }
    };

    return (
        <Element name="reviews" className="reviews-section">
            <motion.h2 initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>Customer Reviews</motion.h2>
            <div className="reviews-container">
                {reviews.map(review => <Review key={review.id} review={review} />)}
            </div>
            <button onClick={handleToggleReviews} className="toggle-reviews-btn">
    {expanded ? (
        <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <FiArrowUp /> Hide
        </motion.span>
    ) : (
        <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <FiArrowDown /> See More
        </motion.span>
    )}
</button>

        </Element>
    );
};

export default Reviews;
