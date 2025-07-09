// src/components/Doctor/DoctorMessaging.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const DoctorMessaging = ({ currentDoctorId = "doctor123", recipientId = "patient456" }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const roomId = [currentDoctorId, recipientId].sort().join("_");

  useEffect(() => {
    socket.emit("join_room", roomId);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  const handleSend = async () => {
    if (!message.trim() && !file) return;

    let fileData = null;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post("http://localhost:5000/api/upload", formData);
        fileData = res.data;
      } catch (err) {
        console.error("File upload failed", err);
        return;
      }
    }

    const messageData = {
      sender: currentDoctorId,
      recipient: recipientId,
      text: message,
      timestamp: new Date().toISOString(),
      file: fileData, // contains fileName and fileUrl
    };

    socket.emit("send_message", { roomId, messageData });
    setMessages((prev) => [...prev, messageData]);
    setMessage("");
    setFile(null);
  };

  const isFile = (msg) => msg.file && msg.file.fileUrl;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Chat with {recipientId}</h2>

      <div className="h-80 overflow-y-auto border p-3 rounded mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === currentDoctorId ? "text-right" : "text-left"}`}>
            <div className="inline-block px-3 py-2 bg-blue-100 rounded-lg max-w-xs">
              {msg.text && <p className="text-sm mb-1">{msg.text}</p>}

              {isFile(msg) && (
                <a
                  href={`http://localhost:5000${msg.file.fileUrl}`}
                  download={msg.file.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm block"
                >
                  📎 {msg.file.fileName}
                </a>
              )}

              <span className="text-xs text-gray-400 block mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="file"
          className="border rounded px-2 py-1 text-sm"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorMessaging;
