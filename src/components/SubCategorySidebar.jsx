import React from 'react';
import '../css/SubCategorySidebar.css';

const SubCategorySidebar = ({ subCategories, handleSubCategoryClick }) => {
    return (
        <div className="sidebar">
            {subCategories.map(subCategory => (
                <div key={subCategory._id} className="subcategory-item" onClick={() => handleSubCategoryClick(subCategory._id)}>
                    <div className="subcategory-header">
                        <img
                            src={subCategory.subcategoryImage && subCategory.subcategoryImage.length > 0
                                ? subCategory.subcategoryImage[0]
                                : 'https://via.placeholder.com/40'}
                            alt={subCategory.name}
                            className="subcategory-image"
                        />
                        <div className="subcategory-info">
                            <span className="subcategory-name">{subCategory.name}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubCategorySidebar;
