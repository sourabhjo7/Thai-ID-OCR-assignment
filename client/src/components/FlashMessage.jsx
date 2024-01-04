import React from 'react';
import './FlashMessage.css'; // Import CSS for styling

const FlashMessage = ({ message, type, onClose }) => {
  return (
    <div className={`FlashMessage ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FlashMessage;
