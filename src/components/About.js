import React from 'react'
import john from './images/john-doe.png'
import './About.css'

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                {/* <img src={john} alt='john' /> */}
                <div className='col-2'>
                    <h2>About</h2>
                    <span className='line'></span>
                    <p>At FarAuto, we are not just in the business of selling cars; we are in the business of creating memorable and lasting experiences. Since our establishment, we have been committed to providing exceptional service, quality vehicles, and a customer-centric approach that goes beyond expectations.</p>
                    <p>Our philosophy is simple: to be more than just a dealership; we aim to be your automotive partner for life. We understand that buying a car is more than a transaction—it's a significant decision that involves trust and confidence. That's why we prioritize transparency, honesty, and integrity in every interaction.</p>
                    <button className='button'>Explore More</button>
                </div>
            </div>
        </div>
    )
}

export default About