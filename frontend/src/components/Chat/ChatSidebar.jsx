// frontend/src/components/Chat/ChatSidebar.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatSidebar = ({ setSelectedChat, selectedChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages/chats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setChats(res.data));
  }, []);

  return (
    <div className="w-1/3 border-r bg-white overflow-y-auto">
      <h2 className="text-xl font-bold p-4 border-b">Chats</h2>
      {chats.map(chat => (
        <div
          key={chat.id}
          className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedChat?.id === chat.id ? 'bg-gray-200' : ''}`}
          onClick={() => setSelectedChat(chat)}
        >
          <div className="font-semibold">{chat.is_group ? chat.name : chat.otherUserName}</div>
          <div className="text-sm text-gray-500 truncate">
            {chat.lastMessage || 'No messages yet'}
          </div>
          {chat.unreadCount > 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
              {chat.unreadCount}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
