// frontend/src/components/Chat/ChatUI.jsx
import React, { useState } from 'react';
import ConversationList from './ConversationList';
import ChatBox from './ChatBox';

const ChatUI = ({ currentUserId }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <ConversationList
        currentUserId={currentUserId}
        onSelectConversation={setSelectedConversation}
      />
      <ChatBox
        currentUserId={currentUserId}
        conversation={selectedConversation}
      />
    </div>
  );
};

export default ChatUI;
