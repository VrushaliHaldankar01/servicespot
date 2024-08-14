import React, {useState} from 'react';
import '../css/SubCategorySidebar.css';
import { useNavigate } from 'react-router';

const SubCategorySidebar = ({ subCategories, handleSubCategoryClick }) => {
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
    const navigate = useNavigate();

    const handleSubCategorySelection = (id) => {
        setSelectedSubCategoryId(id);
        handleSubCategoryClick(id);
    };

    const handleBackClick = () => {
        navigate('/categories');
    };
    return (
        <div className="subcategory-sidebar">
            <button className='back-button' onClick={handleBackClick}>
                Back to Categories
            </button>
            {subCategories.map(subCategory => (
                // <div key={subCategory._id} className="subcategory-item" onClick={() => handleSubCategoryClick(subCategory._id)}>
                <div
                key={subCategory._id}
                className={`subcategory-item ${
                    selectedSubCategoryId === subCategory._id ? 'selected' : ''
                }`}
                onClick={() => handleSubCategorySelection(subCategory._id)}
            >
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
