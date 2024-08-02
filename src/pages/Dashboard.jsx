import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import '../css/Dashboard.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [trendingServices, setTrendingServices] = useState([]);
    const [popularServices, setPopularServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
        const fetchData = async () => {
            try {
                const trendingResponse = await axios.get('http://localhost:4000/admin/fetchTrendingCategory');
                const popularResponse = await axios.get('http://localhost:4000/admin/fetchPopularCategory');
                const categoriesResponse = await axios.get("http://localhost:4000/admin/fetchCategory");

                console.log('Trending Services:', trendingResponse.data);
                console.log('Popular Services:', popularResponse.data);
                console.log('Categories:', categoriesResponse.data);

                setTrendingServices(trendingResponse.data);
                setPopularServices(popularResponse.data);
                setCategories(categoriesResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please try again later.');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderServiceCards = (services) => {
        return services.slice(0, 3).map(({ category }) => (
            <div className="service-card" key={category._id}>
                <div className="service-image">
                    <img
                        src={category.categoryImage.length > 0 ? category.categoryImage[0] : "https://via.placeholder.com/150"}
                        alt={category.name}
                    />
                </div>
                <div className="service-details">
                    <h4>{category.name}</h4>
                    <p>{category.description}</p>
                </div>
            </div>
        ));
    };

    const placeholderImage = "https://via.placeholder.com/150";
    const renderCategoryCards = (categories) => {
        return categories.map((category) => (
            <div className="category-card" key={category._id}>
                <div className="category-image">
                    <img
                        src={category.categoryImage.length > 0 ? category.categoryImage[0] : placeholderImage}
                        alt={category.name}
                    />
                </div>
                <div className="category-details">
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                </div>
            </div>
        ));
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/admin/fetchCategory?name=${searchTerm}`);
            const category = response.data;
            if (category.length > 0) {
                navigate(`/category/${category[0]._id}`);
            } else {
                alert("Data not found");
                navigate('/');
            }
        } catch (error) {
            console.error('Error searching for category:', error);
            alert("Data not found");
            navigate('/');
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <Header />
            <div className="hero-section">
                <h2>Transforming the Way You Find and Get the Services to Your Doorstep</h2>
                <p>ServiceSpot is a one-stop solution for all service-related needs</p>
                <div className="search-bar">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
                </div>
            </div>

            <div className="content-section">
                <div className="section-header">
                    <h3>Categories</h3>
                    <a href="/categories" className="viewall">View All</a>
                </div>
                {categories.length > 5 && (
                    <Slider {...settings}>
                        {renderCategoryCards(categories.slice(5))}
                    </Slider>
                )}
                <div className="section-header">
                    <h3>Trending Services</h3>
                </div>
                <div className="service-list">
                    {renderServiceCards(trendingServices)}
                </div>
                
                <div className="section-header">
                    <h3>Popular Services</h3>
                </div>
                <div className="service-list">
                    {renderServiceCards(popularServices)}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
