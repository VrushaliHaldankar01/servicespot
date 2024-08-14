import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './VendorDashboard.module.css';
import VendorSideBar from './VendorSideBar';
import OrderList from './OrderList';
import Messages from './Messages';
import Services from './Services';
import VendorProfile from './VendorProfile';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const VendorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [services, setServices] = useState([
    { id: 1, name: 'Plumbing Service', categoryName: 'Home Services', description: 'Your partner in plumbing, ensuring a lifetime of comfort and hassle-free living.', price: 150 },
    { id: 2, name: 'Electrical Service', categoryName: 'Home Services', description: 'Expert electricians to address all your electrical needs with precision and safety.', price: 200 },
    { id: 3, name: 'Cleaning Service', categoryName: 'Cleaning', description: 'Professional cleaners who ensure your space is spotless and hygienic.', price: 100 },
  ]);

  const [newService, setNewService] = useState({ name: '', categoryName: '', description: '', price: '' });
  const [editingService, setEditingService] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  // Handle form submission for adding a new service
  const handleAddService = (e) => {
    e.preventDefault();
    if (parseFloat(newService.price) < 0) {
      alert('Price cannot be a negative value.');
      return;
    }
    const newId = services.length ? services[services.length - 1].id + 1 : 1;
    setServices([...services, { id: newId, ...newService }]);
    setNewService({ name: '', categoryName: '', description: '', price: '' });
  };

  // Handle form submission for editing an existing service
  const handleUpdateService = (e) => {
    e.preventDefault();
    if (parseFloat(editingService.price) < 0) {
      alert('Price cannot be a negative value.');
      return;
    }
    setServices(
      services.map((service) =>
        service.id === editingService.id ? editingService : service
      )
    );
    setEditingService(null);
  };

  // Handle deleting a service
  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  // Handle input changes for editing
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingService({ ...editingService, [name]: value });
  };

  return (
    <div className={styles['vd-vendor-dashboard']}>
      <Header />
      <div className={styles['vd-dashboard-container']}>
        <VendorSideBar
          className={styles['vendor-sidebar']}
          setActiveComponent={setActiveComponent}
          activeComponent={activeComponent}
        />
        <div className={styles['vd-dashboard-section']}>
          {activeComponent === 'dashboard' && (
            <div className={styles['vd-vendor-services']}>
              <h3>My Services</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Service ID</th>
                    <th>Service Name</th>
                    <th>Service Category</th>
                    <th>Description</th>
                    <th>Price ($)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>{service.id}</td>
                      <td>{service.name}</td>
                      <td>{service.categoryName}</td>
                      <td>{service.description}</td>
                      <td>{service.price}</td>
                      <td>
                        <button
                          className={`${styles['vd-dashboard-button']} btn btn-primary btn-sm`}
                          onClick={() => setEditingService(service)}
                        >
                          Edit
                        </button>
                        <button
                          className={`${styles['vd-dashboard-button']} btn btn-danger btn-sm`}
                          onClick={() => handleDeleteService(service.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

             {/* Form to Add New Service */}
             <div className={styles['add-service-container']}>
  <h3>Add New Service</h3>
  <form onSubmit={handleAddService}>
    <div className={styles['vd-form-group']}>
      <label>Service Name</label>
      <input
        type="text"
        className="form-control"
        name="name"
        value={newService.name}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className={styles['vd-form-group']}>
      <label>Service Category</label>
      <input
        type="text"
        className="form-control"
        name="categoryName"
        value={newService.categoryName}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className={styles['vd-form-group']}>
      <label>Description</label>
      <textarea
        className="form-control"
        name="description"
        value={newService.description}
        onChange={handleInputChange}
        required
      ></textarea>
    </div>
    <div className={styles['vd-form-group']}>
      <label>Price ($)</label>
      <input
        type="number"
        className="form-control"
        name="price"
        value={newService.price}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className={styles['vd-form-buttons']}>
      <button type="submit" className="btn btn-primary">
        Add Service
      </button>
    </div>
  </form>
</div>



{/* Form to Edit Existing Service */}
{editingService && (
  <div className={styles['edit-service-container']}>
    <h3>Edit Service</h3>
    <form onSubmit={handleUpdateService}>
      <div className={styles['form-group']}>
        <label htmlFor="serviceName">Service Name</label>
        <input
          type="text"
          id="serviceName"
          className="form-control"
          name="name"
          value={editingService.name}
          onChange={handleEditInputChange}
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="serviceCategory">Service Category</label>
        <input
          type="text"
          id="serviceCategory"
          className="form-control"
          name="categoryName"
          value={editingService.categoryName}
          onChange={handleEditInputChange}
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control"
          name="description"
          value={editingService.description}
          onChange={handleEditInputChange}
          required
        ></textarea>
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          className="form-control"
          name="price"
          value={editingService.price}
          onChange={handleEditInputChange}
          required
        />
      </div>
      <div className={styles['form-buttons']}>
        <button type="submit" className="btn btn-primary">
          Update Service
        </button>
        <button
          type="button"
          className={`btn btn-secondary ${styles['btn-cancel']}`}
          onClick={() => setEditingService(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}


            </div>
          )}

          {activeComponent === 'orders' && <OrderList />}
          {activeComponent === 'messages' && <Messages />}
          {activeComponent === 'services' && <Services />}
          {activeComponent === 'profile' && <VendorProfile />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
