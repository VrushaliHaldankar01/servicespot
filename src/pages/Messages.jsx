import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []); // Fetch messages on component mount

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages'); // Replace with your API endpoint
      setMessages(response.data); // Assuming response.data is an array of messages
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error state if needed
    }
  };

  return (
    <div className="messages">
      <h3>Messages</h3>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
