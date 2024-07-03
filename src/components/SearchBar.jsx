import React from "react";
import '../css/SearchBar.css';

function SearchBar(){
    return(
        <div className="search-container">
        <input type='text' placeholder="Search for Category"/>
        <i className="fas fa-search search-icon"></i>
        </div>
    );
}
export default SearchBar;