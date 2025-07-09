// frontend/src/components/Chat/ChatBox.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageItem from './MessageItem';

const ChatBox = ({ currentUserId, conversation }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    if (conversation) {
      axios.get(`http://localhost:5000/api/messages/messages/${conversation.id}`)
        .then(res => setMessages(res.data))
        .catch(err => console.error(err));
    }
  }, [conversation]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    axios.post('http://localhost:5000/api/messages/send', {
      conversation_id: conversation.id,
      sender_id: currentUserId,
      message: newMsg,
    })
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        setNewMsg('');
      })
      .catch(err => console.error(err));
  };

  if (!conversation) return (
    <div className="w-2/3 p-4 flex items-center justify-center text-gray-500">
      Select a conversation to start chatting
    </div>
  );

  return (
    <div className="w-2/3 flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(msg => (
          <MessageItem key={msg.id} message={msg} isOwn={msg.sender_id === currentUserId} />
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
