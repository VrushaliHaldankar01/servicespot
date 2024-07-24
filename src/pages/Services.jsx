import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css'; // Import the CSS file

const Services = () => {
  const [services, setServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState('');
  const [editService, setEditService] = useState(null);
  const [vendorId, setVendorId] = useState(1); // Replace with dynamic vendor ID

  useEffect(() => {
    fetchServices();
  }, []); // Fetch services on component mount

  const fetchServices = async () => {
    try {
      const response = await axios.get(`/api/vendors/${vendorId}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const addService = async () => {
    try {
      const response = await axios.post(`/api/vendors/${vendorId}/services`, { name: newServiceName });
      setServices([...services, response.data]);
      setNewServiceName('');
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`/api/vendors/${vendorId}/services/${id}`);
      const updatedServices = services.filter(service => service.id !== id);
      setServices(updatedServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const editServiceName = async () => {
    try {
      await axios.put(`/api/vendors/${vendorId}/services/${editService.id}`, { name: editService.name });
      const updatedServices = services.map(service =>
        service.id === editService.id ? { ...service, name: editService.name } : service
      );
      setServices(updatedServices);
      setEditService(null);
    } catch (error) {
      console.error('Error editing service:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewServiceName(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditService({ ...editService, name: event.target.value });
  };

  const startEdit = (service) => {
    setEditService(service);
  };

  const cancelEdit = () => {
    setEditService(null);
  };

  return (
    <div className="services">
      <h3>Manage Your Services</h3>
      <div className="add-service-form">
        <input
          type="text"
          value={newServiceName}
          onChange={handleInputChange}
          placeholder="Enter new service name"
        />
        <button onClick={addService} className="add-button">Add Service</button>
      </div>
      <ul className="services-list">
        {services.map(service => (
          <li key={service.id} className="service-item">
            {editService && editService.id === service.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editService.name}
                  onChange={handleEditChange}
                  placeholder="Edit service name"
                />
                <button onClick={editServiceName} className="save-button">Save</button>
                <button onClick={cancelEdit} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <div className="service-content">
                {service.name}
                <div className="service-buttons">
                  <button onClick={() => startEdit(service)} className="edit-button">Edit</button>
                  <button onClick={() => deleteService(service.id)} className="delete-button">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
