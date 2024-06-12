import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import '../css/Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className="hero-section">
                <h2>Transforming the Way You Find and Get the Services to Your Doorstep</h2>
                <p>ServiceSpot is a one-stop solution for all service-related needs</p>
                <div className="search-bar">
                <SearchBar />
                </div>
            </div>
            <div className="content-section">
                <h3>Trending Services</h3>
                <div className="service-list">
                    {Array(3).fill().map((_, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-image">img</div>
                            <div className="service-details">
                                <h4>Your Partner in Plumbing, for a Lifetime of Comfort</h4>
                                <p>Business name</p>
                                <p>Plumbing Service</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3>Popular Services</h3>
                <div className="service-list">
                    {Array(3).fill().map((_, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-image">img</div>
                            <div className="service-details">
                                <h4>Your Partner in Plumbing, for a Lifetime of Comfort</h4>
                                <p>Business name</p>
                                <p>Plumbing Service</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;