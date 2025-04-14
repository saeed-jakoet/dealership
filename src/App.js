import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import Navbar from './components/Navbar/Navbar';
import Page from './components/Page';
import Footer from './components/Footer/Footer';

function App() {
    const isUnderConstruction = false; // Set this flag to true to show the under construction page

    return (
        <Router>
            {isUnderConstruction ? (
                <UnderConstruction />
            ) : (
                <>
                    <Navbar />
                    <Page content="hero" />
                    <Page content="about" />
                    <Page content="listings" />
                    <Page content="contact" />
                    <Page content="reviews" />
                    <Footer />
                </>
            )}
        </Router>
    );
}

export default App;
