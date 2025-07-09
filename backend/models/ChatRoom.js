// models/ChatRoom.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ChatRoom = sequelize.define('ChatRoom', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_group: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default ChatRoom;
