// frontend/src/components/Chat/ChatWindow.jsx
import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedChat) return;

    socket.emit('join_room', selectedChat.id);
    fetchMessages();

    socket.on('receive_message', (msg) => {
      if (msg.chat_room_id === selectedChat.id) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => socket.off('receive_message');
  }, [selectedChat]);

  const fetchMessages = async () => {
    const res = await fetch(`http://localhost:5000/api/messages/${selectedChat.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    setMessages(data);
  };

  if (!selectedChat) {
    return <div className="w-2/3 flex items-center justify-center text-gray-400">Select a chat to start messaging</div>;
  }

  return (
    <div className="w-2/3 flex flex-col h-full">
      <div className="p-4 bg-white border-b shadow font-bold">
        {selectedChat.is_group ? selectedChat.name : selectedChat.otherUserName}
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {messages.map(msg => (
          <div key={msg.id} className="mb-3">
            <div className={`p-3 rounded-lg max-w-xl ${msg.isMine ? 'bg-blue-100 ml-auto' : 'bg-white'}`}>
              {msg.message_type === 'file' ? (
                <a href={`http://localhost:5000/uploads/${msg.file}`} download target="_blank" rel="noopener noreferrer">
                  📎 {msg.originalName}
                </a>
              ) : (
                msg.message
              )}
            </div>
          </div>
        ))}
      </div>
      <MessageInput chatId={selectedChat.id} />
    </div>
  );
};

export default ChatWindow;
