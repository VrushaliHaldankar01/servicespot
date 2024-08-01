import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests (you can also use fetch)
import './Orderlist.css'

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Replace with actual endpoint
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-list">
      <h3>Order List</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.item} for {order.customer} on {order.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
