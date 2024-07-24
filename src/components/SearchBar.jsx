import React from "react";
import '../css/SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type='text'
                placeholder="Search for Category"
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            {/* <button onClick={handleSearch} className="search-button">
                <i className="fas fa-search search-icon"></i>
            </button> */}
        </div>
    );
};

export default SearchBar;
