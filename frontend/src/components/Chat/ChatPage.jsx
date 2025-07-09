// frontend/src/components/Chat/ChatPage.jsx
import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar setSelectedChat={setSelectedChat} selectedChat={selectedChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
};

export default ChatPage;
