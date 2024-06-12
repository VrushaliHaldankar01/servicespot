import React from "react";
import SearchBar from "./SearchBar";
import '../css/HeroSection.css';
function HeroSection(){
    return(
        <div className="hero-section">
            <h2>Transforming the Way You FInd and Get the Services at your Doorstep</h2>
            <p>ServiceSpot is a one-stop solution for all service related needs</p>
            <SearchBar/>
        </div>
    );
}
export default HeroSection;