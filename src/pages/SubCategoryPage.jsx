import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubCategorySidebar from '../components/SubCategorySidebar';
import '../css/SubCategoryPage.css';

const SubCategoryPage = () => {
  const { subCategoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/fetchSubCategory');
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubCategories();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/vendor/VendorWrtSubcategory'); // Assuming this endpoint returns all vendors
        setVendors(response.data);
        setFilteredVendors(response.data); // Initially show all vendors
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    if (subCategoryId) {
      const fetchSelectedSubCategory = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/admin/fetchPerticularSubCategory?id=${subCategoryId}`);
          setSelectedSubCategory(response.data);
        } catch (error) {
          console.error('Error fetching selected subcategory:', error);
        }
      };
      fetchSelectedSubCategory();
      filterVendorsBySubCategory(subCategoryId);
    } else {
      setSelectedSubCategory(null);
      setFilteredVendors(vendors); // Show all vendors if no subcategory is selected
    }
  }, [subCategoryId, vendors]);

  const filterVendorsBySubCategory = (id) => {
    const filtered = vendors.filter(vendor => vendor.subcategory && vendor.subcategory._id === id);
    setFilteredVendors(filtered);
  };

  const handleSubCategoryClick = (id) => {
    navigate(`/subcategory/${id}`);
  };

  return (
    <div>
      <Header />
      <div className='subcategory-page'>
        <SubCategorySidebar subCategories={subCategories} handleSubCategoryClick={handleSubCategoryClick} />
        <div className='content'>
          <div className='subcategory-details'>
            <h1>{selectedSubCategory ? selectedSubCategory.name : 'All Vendors'}</h1>
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <div key={vendor._id} className='vendor-card'>
                  {/* <h2>{vendor.subcategory && vendor.subcategory.name}</h2> */}
                                  
      <img
                    src={vendor.businessImages && vendor.businessImages.length > 0
                      ? vendor.businessImages[0]
                      : 'https://via.placeholder.com/150'}
                    alt={vendor.businessname}
                  />
                  <div className='vendor-info'>
                    {/* <h3>Business Name: {vendor.businessname}</h3> */}
                    <h3> <div className="category-name">
        {vendor.subcategory && vendor.subcategory.category
          ? vendor.subcategory.category.name
          : 'No Category'}
      </div> </h3>
                    <p><b>Business Name:</b> {vendor.businessname}</p>
                    <p><b>Description:</b> {vendor.businessdescription}</p>
                    {/* <p><b>Vendor Name:</b> {vendor.vendorid.firstName} {vendor.vendorid.lastName}</p> */}
                    <p><b>Email:</b> {vendor.vendorid.email}</p>
                    <p><b>Business Address:</b> {`${vendor.city}, ${vendor.province}, ${vendor.postalcode}`}</p>
                    {/* <p><b>Phone Number:</b> {vendor.vendorid.phonenumber}</p> */}
                    <button><b>View Vendor Details</b></button>
                  </div>
                </div>
              ))
            ) : (
              <>
              <p>No vendors available for this subcategory.</p>
              <h2>All Vendors</h2>
                {vendors.map((vendor) => (
                  <div key={vendor._id} className='vendor-card'>
                    <img
                      src={vendor.businessImages && vendor.businessImages.length > 0
                        ? vendor.businessImages[0]
                        : 'https://via.placeholder.com/150'}
                      alt={vendor.businessname}
                    />
                    <div className='vendor-info'>
                      <h3><div className="category-name">
        {vendor.subcategory && vendor.subcategory.category
          ? vendor.subcategory.category.name
          : 'No Category'}
      </div></h3>
                      <p><b>Business Address:</b> {`${vendor.city}, ${vendor.province}, ${vendor.postalcode}`}</p>
                      <p><b>Description:</b> {vendor.businessdescription}</p>
                      <p><b>Email:</b> {vendor.vendorid.email}</p>
                      <button onClick={() => navigate('/VendorDetailPage')}><b>View Vendor Details</b></button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubCategoryPage;
