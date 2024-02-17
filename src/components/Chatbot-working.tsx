import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <div className="chatbot-container">
      <button onClick={toggleChatbot} className="chatbot-button">
        <img src="/assets/images/chat.png" alt="Chat" width="50" height="50" />
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">
            <h2>Chat with us!</h2>
            <button onClick={toggleChatbot} className="close-button">
              X
            </button>
          </div>
          <ul className="chat-messages">{/* Messages will be added here */}</ul>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
            />
            <button className="send-button">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
