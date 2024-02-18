import React, { useState } from 'react';

import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css'; // Import default stylesheet
import BookingPopup from './BookingPopUp';
import MessageBubble from './MessageBubble';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChatbot = () => setIsOpen(!isOpen);
  const [conversation, setConversation] = useState<Message[]>([]);

  const containsKeywords = (message: string, keywords: string[]): boolean => {
    return keywords.some((keyword) =>
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const apiUrl = 'https://api.together.xyz/v1/chat/completions';
  const apiKey =
    '6b464adb78258c5f74a8b2304d6ddd9a7269fbfd29db358d4c9386b0820b3856';

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  });

  const sendRequest = async (messages: { role: string; content: any }[]) => {
    try {
      const data = {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        max_tokens: 1024,
        messages,
      };

      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      };

      const response = await fetch(apiUrl, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
      // Instead of throwing, you might want to handle the error gracefully
      // throw new Error('Failed to communicate with the chatbot API');
    }
  };

  const handleUserMessage = async (userMessage: string) => {
    const newUserMessage: Message = { role: 'user', content: userMessage };
    const updatedConversation = [...conversation, newUserMessage];
    setConversation(updatedConversation);

    try {
      const botResponse = await sendRequest(updatedConversation);
      // You need to check if botResponse is valid before trying to access properties
      if (
        botResponse &&
        botResponse.choices &&
        botResponse.choices.length > 0
      ) {
        const botMessage = botResponse.choices[0].message.content;
        setConversation((c) => [...c, { role: 'bot', content: botMessage }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = () => {
    const input = document.querySelector('.chat-input') as HTMLInputElement;
    const userMessage = input.value;
    if (userMessage.trim()) {
      handleUserMessage(userMessage);
      input.value = '';
    }
  };

  return (
    <div className="chatbot-container">
      <button onClick={toggleChatbot} className="chatbot-button">
        <img src="/assets/images/chat.png" alt="Chat" />
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">
            <h2>Chat with us!</h2>
            <button onClick={toggleChatbot} className="close-button">
              X
            </button>
          </div>
          <ul className="chat-messages">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`message-bubble ${
                  message.role === 'bot' ? 'bot-message' : 'user-message'
                }`}
              >
                <MessageBubble
                  key={index}
                  role={message.role}
                  content={message.content}
                />
                {message.role === 'bot' &&
                  containsKeywords(message.content, [
                    'doctor',
                    'treatment',
                    'nursing',
                    'health',
                  ]) && (
                    <Popup
                      trigger={
                        <button
                          className="book-appointment-button"
                          onClick={toggleChatbot}
                        >
                          Book an Appointment
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close: () => void) => <BookingPopup close={close} />}
                    </Popup>
                  )}
              </div>
            ))}
          </ul>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  handleUserMessage(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
