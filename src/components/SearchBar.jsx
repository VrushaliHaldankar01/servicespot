import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify functions
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import '../css/SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/admin/fetchCategory?name=${term}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/fetchCategory`
      );
      const matchedCategory = response.data.find(
        (category) => category.name.toLowerCase() === searchTerm.toLowerCase()
      );

      if (matchedCategory) {
        const categoryName = matchedCategory.name;
        navigate(`/categories/${encodeURIComponent(categoryName)}`);
      } else {
        toast.error('No categories found. Please try again.', {
          position: 'top-right',
          autoClose: 3000, // Toast will be visible for 3 seconds
          hideProgressBar: true, // Hide the progress bar
          closeOnClick: true, // Allow closing the toast on click
          pauseOnHover: true, // Pause the toast on hover
          draggable: false, // Disable dragging
        });
      }
    } catch (error) {
      console.error('Error searching for category:', error);
      toast.error('An error occurred during search. Please try again.', {
        position: 'top-right',
        autoClose: 3000, // Toast will be visible for 3 seconds
        hideProgressBar: true, // Hide the progress bar
        closeOnClick: true, // Allow closing the toast on click
        pauseOnHover: true, // Pause the toast on hover
        draggable: false, // Disable dragging
      });
    }
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='Search for Category'
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch} className='search-button'>
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className='suggestions-list'>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => {
                setSearchTerm(suggestion.name);
                handleSearch();
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
