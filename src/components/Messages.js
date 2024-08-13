import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../css/ChatMessages.css'; // Import the CSS for styling

const SOCKET_SERVER_URL = 'http://localhost:5000';
const socket = io(SOCKET_SERVER_URL);

const Messages = ({ userId, recipientId, recipientType }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join the chat room for the current user
    socket.emit('join', userId);

    // Listen for incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.off('receiveMessage');
    };
  }, [userId]);

  const handleSendMessage = () => {
    const messageData = {
      sender: userId,
      receiver: recipientId,
      receiverType: recipientType,
      content: message,
    };

    // Emit the message to the server
    socket.emit('sendMessage', messageData);
    setMessage('');
  };

  return (
    <div className='chat-container'>
      <div className='messages'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === userId ? 'sent' : 'received'}`}
          >
            <strong>{msg.sender === userId ? 'Me' : 'Them'}:</strong>{' '}
            {msg.content}
          </div>
        ))}
      </div>
      <div className='message-input'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message'
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
