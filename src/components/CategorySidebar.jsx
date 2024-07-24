import React from 'react';
import '../css/CategorySidebar.css';

const CategorySidebar = ({
    categories,
    expandedCategoryId,
    subCategoriesMap,
    handleCategoryClick,
    handleSubCategoryClick,
}) => {
    return (
        <div className="sidebar">
            {categories.map(category => (
                <div key={category._id} className="category-item">
                    <div className="category-header" onClick={() => handleCategoryClick(category._id, category.name)}>
                        <img src={category.categoryImage.length > 0 ? category.categoryImage[0] : 'https://via.placeholder.com/40'} alt={category.name} className="category-image" />
                        <div className="category-info">
                            <span className="category-name">{category.name}</span><br></br>
                            <span className="category-description">{category.description}</span>
                        </div>
                        <span className="arrow">{expandedCategoryId === category._id ? '▲' : '▼'}</span>
                    </div>
                    {expandedCategoryId === category._id && subCategoriesMap[category._id] && (
                        <div className="subcategories">
                            {subCategoriesMap[category._id].map(subCategory => (
                                <button key={subCategory._id} onClick={() => handleSubCategoryClick(subCategory)} className="subcategory-button">
                                    {subCategory.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategorySidebar;
