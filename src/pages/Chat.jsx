// import React from 'react';
// import Messages from '../components/Messages';

// const Chat = () => {
//   // Define the userId, recipientId, and recipientType here
//   const userId = '66847396789f511cf7fc4b9a'; // Replace with actual user ID
//   const recipientId = '66aab0a3c399470ba2935902'; // Replace with actual recipient ID
//   const recipientType = 'Vendor'; // Replace with 'Vendor' if chatting with a vendor

//   return (
//     <div>
//       <h1>Messages</h1>
//       <Messages
//         userId={userId}
//         recipientId={recipientId}
//         recipientType={recipientType}
//       />
//     </div>
//   );
// };

// export default Chat;

import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Messages from '../components/Messages';
import '../css/ChatModal.css';

ReactModal.setAppElement('#root'); // For accessibility

const Chat = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Define the userId, recipientId, and recipientType here
  const userId = '66bab662ffdb6718f95c0197'; // Replace with actual user ID
  const recipientId = '6684ca9591be59c0b357422e'; // Replace with actual recipient ID
  const recipientType = 'Vendor'; // Replace with 'Vendor' if chatting with a vendor

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <button onClick={openModal} className='open-chat-button'>
        Open Chat
      </button>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Chat Modal'
        className='chat-modal'
        overlayClassName='chat-overlay'
      >
        <div className='chat-header'>
          <h2>Chat with {recipientType}</h2>
          <button onClick={closeModal} className='close-chat-button'>
            X
          </button>
        </div>
        <div className='chat-body'>
          <Messages
            userId={userId}
            recipientId={recipientId}
            recipientType={recipientType}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default Chat;
