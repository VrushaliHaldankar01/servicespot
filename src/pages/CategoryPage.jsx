import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategorySidebar from '../components/CategorySidebar';
import '../css/CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);
    const [categoryContent, setCategoryContent] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/admin/fetchCategory');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchAllSubCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/admin/fetchSubCategory');
                setSubCategories(response.data);
                setFilteredSubCategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };
        fetchAllSubCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        if (categoryId === expandedCategoryId) {
            // If the same category is clicked again, reset the filter
            setExpandedCategoryId(null);
            setFilteredSubCategories(subCategories);
        } else {
            setExpandedCategoryId(categoryId);
            setFilteredSubCategories(subCategories.filter(subCategory => subCategory.category === categoryId));
        }
    };

    const handleSubCategoryClick = async (subCategory) => {
        try {
            const response = await axios.get(`http://localhost:4000/admin/fetchPerticularSubCategory?name=${subCategory.name}`);
            setCategoryContent(response.data);
        } catch (error) {
            console.error('Error fetching category content:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="category-page">
                <CategorySidebar
                    categories={categories}
                    expandedCategoryId={expandedCategoryId}
                    handleCategoryClick={handleCategoryClick}
                />
                <div className="content">
                    {filteredSubCategories.slice(0, 6).map(subCategory => (
                        <div key={subCategory._id} className="subcategory-card">
                            <img src={subCategory.subcategoryImage.length > 0 ? subCategory.subcategoryImage[0] : 'https://via.placeholder.com/150'} alt={subCategory.name} />
                            <h3>{subCategory.name}</h3>
                            <p>{subCategory.description}</p>
                            <button onClick={() => handleSubCategoryClick(subCategory)}>View Details</button>
                        </div>
                    ))}
                    {categoryContent && (
                        <div className="category-content">
                            <h2>{categoryContent.title}</h2>
                            <p>{categoryContent.description}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
