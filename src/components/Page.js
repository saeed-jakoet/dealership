import React from "react";
import Hero from "../pages/Hero/page";
import About from "../pages/About/page";
import Contact from "../pages/Contact/page";
import Listings from "../pages/Listings/page"; // Corrected import path
import Reviews from "../pages/Reviews/page";

const Page = ({ content }) => {
  switch (content) {
    case "hero":
      return <Hero />;
    case "about":
      return <About />;
    case "contact":
      return <Contact />;
    case "listings":
      return <Listings />;
    case "reviews":
      return <Reviews />;
    default:
      return null;
  }
};

export default Page;
