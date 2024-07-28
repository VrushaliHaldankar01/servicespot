import React from 'react';
import '../css/CategorySidebar.css';

const CategorySidebar = ({ categories, expandedCategoryId, handleCategoryClick }) => {
    return (
        <div className="sidebar">
            {categories.map(category => (
                <div key={category._id} className="category-item" onClick={() => handleCategoryClick(category._id)}>
                    <div className={`category-header ${expandedCategoryId === category._id ? 'expanded' : ''}`}>
                        <img src={category.categoryImage.length > 0 ? category.categoryImage[0] : 'https://via.placeholder.com/40'} alt={category.name} className="category-image" />
                        <div className="category-info">
                            <span className="category-name">{category.name}</span><br />
                            <span className="category-description">{category.description}</span>
                        </div>
                        <span className="arrow">{expandedCategoryId === category._id ? '▲' : '▼'}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategorySidebar;
