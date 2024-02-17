import React from 'react';

const MessageBubble: React.FC<{ role: 'user' | 'bot'; content: string }> = ({
  role,
  content,
}) => {
  const isBot = role === 'bot';

  // Function to parse content into list items if it's from the bot
  const renderContent = () => {
    if (isBot && content.includes('*')) {
      // Split the content by asterisks to create list items
      const items = content
        .split('*')
        .map((item: string) => item.trim())
        .filter((item: any) => item);
      return (
        <ul>
          {items.map((item: any, index: any) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <span>{content}</span>;
  };

  return (
    <div className={`message-bubble ${isBot ? 'bot-message' : 'user-message'}`}>
      <strong>{isBot ? 'Bot' : 'You'}:</strong>
      {renderContent()}
    </div>
  );
};

export default MessageBubble;
