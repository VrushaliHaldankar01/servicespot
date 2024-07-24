import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategorySidebar from '../components/CategorySidebar';
import '../css/CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);
    const [subCategoriesMap, setSubCategoriesMap] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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

    const handleCategoryClick = async (categoryId, categoryName) => {
        if (expandedCategoryId === categoryId) {
            setExpandedCategoryId(null);
            return;
        }

        setExpandedCategoryId(categoryId);

        if (!subCategoriesMap[categoryId]) {
            try {
                const response = await axios.get(`http://localhost:4000/admin/fetchSubCategory?name=${categoryName}`);
                setSubCategoriesMap(prevState => ({ ...prevState, [categoryId]: response.data }));
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        }
    };

    const handleSubCategoryClick = async (subCategory) => {
        setSelectedSubCategory(subCategory);
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
                    subCategoriesMap={subCategoriesMap}
                    handleCategoryClick={handleCategoryClick}
                    handleSubCategoryClick={handleSubCategoryClick}
                />
                <div className="content">
                    {selectedSubCategory && categoryContent && (
                        <div>
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
