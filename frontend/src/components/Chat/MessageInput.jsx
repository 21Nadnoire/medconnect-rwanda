// frontend/src/components/Chat/MessageInput.jsx
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const sendMessage = async () => {
    const formData = new FormData();
    formData.append('chatId', chatId);
    formData.append('message', message);
    if (file) formData.append('file', file);

    const res = await fetch('http://localhost:5000/api/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData
    });

    const data = await res.json();
    socket.emit('send_message', {
      roomId: chatId,
      messageData: data
    });

    setMessage('');
    setFile(null);
  };

  return (
    <div className="p-4 border-t bg-white flex gap-2">
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        className="hidden"
        id="fileUpload"
      />
      <label htmlFor="fileUpload" className="cursor-pointer text-blue-600">📎</label>
      <input
        type="text"
        className="flex-1 border rounded px-4 py-2"
        placeholder="Type your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
