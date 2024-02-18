import React, { useState } from 'react';

import axios from 'axios';
import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css'; // Import default stylesheet
import MessageBubble from './MessageBubble';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChatbot = () => setIsOpen(!isOpen);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [date, setDate] = useState<String | null>(null);
  const [time, setTime] = useState<String | null>(null);

  const containsKeywords = (message: string, keywords: string[]): boolean => {
    return keywords.some((keyword) =>
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const apiUrl = 'https://api.together.xyz/v1/chat/completions';
  const apiKey =
    '2c1ede40cd0e1d54cf69bdc7c49cb46521bf239340628600a3afbe164c1bf706';

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  });

  const sendRequest = async (messages: { role: string; content: any }[]) => {
    try {
      const data = {
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
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

  const scheduleAppointment = async () => {
    console.log('scheduled appointment');
    console.log(date);
    console.log(time);
    try {
      const response = await axios.get(
        'http://localhost:105/scheduleAppointment',
        {
          params: { date, time },
        }
      );

      const { data } = response;

      // Check if data is not null or undefined
      if (data != null) {
        // Ensure setSummary is updating the state correctly
        console.log(data);
      } else {
        console.log('Blank response');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
                        <button className="book-appointment-button">
                          Book an Appointment
                        </button>
                      }
                      modal
                      nested
                      contentStyle={{
                        width: '60%', // You might adjust inline styles or move them to CSS
                        maxWidth: '500px',
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                        position: 'absolute',
                        left: '20%',
                        top: '10%',
                        transform: 'translate(-20%, 10%)',
                        backgroundColor: '#fff',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                      }}
                      overlayStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {(close: () => void) => (
                        <div className="popup-content">
                          <h2 className="popup-header">
                            Booking an Appointment with Your Pet Doctor
                          </h2>
                          <label className="popup-label">
                            Date:
                            <input
                              onChange={(e) => {
                                console.log(e.target.value);
                                setDate(e.target.value);
                              }}
                              type="date"
                              className="popup-date-input"
                            />
                          </label>
                          <label className="popup-label">
                            Time:
                            <input
                              onChange={(e) => {
                                console.log(e.target.value);
                                setTime(e.target.value);
                              }}
                              type="time"
                              className="popup-time-input"
                            />
                          </label>
                          <div className="popup-actions">
                            <button
                              className="popup-confirm-btn"
                              onClick={() => {
                                if (date && time) {
                                  // Make sure date and time are not null
                                  scheduleAppointment();
                                  close(); // Close the popup
                                }
                              }}
                            >
                              Confirm
                            </button>
                            <button className="popup-close-btn" onClick={close}>
                              Close
                            </button>
                          </div>
                        </div>
                      )}
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
