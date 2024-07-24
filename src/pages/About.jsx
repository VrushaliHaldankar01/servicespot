import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AboutModule.css"; // Import your CSS file for additional styling if needed

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const content = [
    {
      title: "1. Transforming the Way You Find and Get the Services to Your Doorstep",
      text: "Welcome to ServiceSpot, your one-stop solution for all service-related needs. We are dedicated to revolutionizing the way you connect with service providers, ensuring that you receive top-notch services right at your doorstep."
    },
    {
      title: "2. Our Mission",
      text: "At ServiceSpot, our mission is to simplify the process of finding reliable and quality services for our customers. We aim to bridge the gap between customers and service providers, offering a platform where you can easily search, compare, and book services that cater to your specific needs."
    },
    {
      title: "3. Our Vision",
      text: "We envision a world where accessing services is seamless, efficient, and stress-free. By leveraging technology, we aspire to create a community of trusted service providers and satisfied customers, fostering a culture of convenience and reliability."
    },
    {
      title: "4. What We Offer",
      text: `1. Search for Category: Whether you need plumbing, electrical, cleaning, or any other service, ServiceSpot provides a comprehensive list of categories to choose from.<br /> <br />
      2. Trending Services: Stay updated with the latest and most popular services that people are availing in your area.<br /> <br />
      3. Popular Services: Discover services that have garnered excellent reviews and high satisfaction rates among our users.`
    },
    {
      title: "5. Our Core Services",
      text: `1. Plumbing Service: Your partner in plumbing, ensuring a lifetime of comfort and hassle-free living.<br /> <br />
       2. Electrical Service: Expert electricians to address all your electrical needs with precision and safety.<br /> <br />
       3. Cleaning Service: Professional cleaners who ensure your space is spotless and hygienic.<br /> <br />
       4. Home Maintenance: Comprehensive home maintenance services to keep your home in top condition.<br /> <br />
       5. Gardening Service: Skilled gardeners to beautify and maintain your garden.`
    },
    {
      title: "6. Why Choose ServiceSpot?",
      text: `1. Reliable Service Providers: We meticulously vet our service providers to ensure they meet our quality standards.<br /> <br />
      2. Customer-Centric Approach: Your satisfaction is our priority. We listen to your feedback and continuously improve our offerings.<br /> <br />
      3. Convenient Booking: Our user-friendly platform makes it easy to search, compare, and book services online.<br /> <br />
      4. Transparent Pricing: We believe in transparency and provide clear pricing without hidden charges.`
    }
  ];

  return (
    <div className="about-page">
      <Header />
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-md-6 col-12 mb-4">
            <div className="service-image">
              <img src="/images/about-us-page.jpg" alt="About Us" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="p-4 rounded bg-light">
              {content.map((item, index) => (
                <div key={index} className="accordion-item mb-3">
                  <div className="accordion-title-container d-flex justify-content-between align-items-center">
                    <h2 className="accordion-title h4 mb-0" onClick={() => toggleAccordion(index)}>
                      {item.title}
                    </h2>
                    <button className="accordion-toggle-btn" onClick={() => toggleAccordion(index)}>
                      {activeIndex === index ? '-' : '+'}
                    </button>
                  </div>
                  {activeIndex === index && (
                    <>
                      <hr className="accordion-hr" />
                      <p className="accordion-text" dangerouslySetInnerHTML={{ __html: item.text }}></p>
                      <hr className="accordion-hr" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
