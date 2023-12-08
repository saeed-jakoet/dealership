// ParallaxPage.js
import React from 'react';
import { Element, Link } from 'react-scroll';
import './Divider.css';

const Divider = () => {
    return (
        <Element name='divider' >
            <div className="divider">
                <div className="parallax-content">
                    {/* Add your creative content here */}
                    <h2>divider</h2>
                </div>
            </div>
        </Element>
    );
};

export default Divider;
