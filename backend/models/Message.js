// models/Message.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import ChatRoom from './ChatRoom.js';
import User from './User.js';

const Message = sequelize.define('Message', {
  room_id: {
    type: DataTypes.INTEGER,
    references: { model: ChatRoom, key: 'id' },
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
  },
  content: {
    type: DataTypes.TEXT,
  },
  message_type: {
    type: DataTypes.ENUM('text', 'image', 'file'),
    defaultValue: 'text',
  },
});

export default Message;
