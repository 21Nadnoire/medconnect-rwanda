// frontend/src/components/Chat/ConversationList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConversationList = ({ currentUserId, onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/messages/conversations/${currentUserId}`)
      .then(res => setConversations(res.data))
      .catch(err => console.error(err));
  }, [currentUserId]);

  return (
    <div className="w-1/3 border-r overflow-y-auto bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Conversations</h2>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelectConversation(conv)}
          className="p-2 hover:bg-gray-200 cursor-pointer rounded"
        >
          Conversation #{conv.id}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
