// models/ChatRoomParticipant.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import ChatRoom from './ChatRoom.js';
import User from './User.js';

const ChatRoomParticipant = sequelize.define('ChatRoomParticipant', {
  room_id: {
    type: DataTypes.INTEGER,
    references: { model: ChatRoom, key: 'id' },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
  },
});

export default ChatRoomParticipant;
