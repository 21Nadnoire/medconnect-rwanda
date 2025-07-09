// frontend/src/components/Chat/MessageItem.jsx
import React from 'react';

const MessageItem = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {message.message}
      </div>
    </div>
  );
};

export default MessageItem;
