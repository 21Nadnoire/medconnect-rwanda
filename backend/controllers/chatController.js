// controllers/chatController.js
import ChatRoom from '../models/ChatRoom.js';
import ChatRoomParticipant from '../models/ChatRoomParticipant.js';
import Message from '../models/Message.js';

// Create or get a private chat room between two users
export const getOrCreatePrivateRoom = async (req, res) => {
  const { user1, user2 } = req.body; // user IDs

  try {
    // Check if private room exists
    let room = await ChatRoom.findOne({
      where: { is_group: false },
      include: [{
        model: ChatRoomParticipant,
        where: { user_id: [user1, user2] },
      }],
    });

    if (!room) {
      // Create new private room
      room = await ChatRoom.create({ is_group: false });
      await ChatRoomParticipant.bulkCreate([
        { room_id: room.id, user_id: user1 },
        { room_id: room.id, user_id: user2 },
      ]);
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  const { room_id, sender_id, content, message_type } = req.body;

  try {
    const message = await Message.create({
      room_id,
      sender_id,
      content,
      message_type: message_type || 'text',
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages for a room
export const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { room_id: roomId },
      order: [['createdAt', 'ASC']],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a group chat room
export const createGroupRoom = async (req, res) => {
  const { name, participantIds } = req.body;

  try {
    const room = await ChatRoom.create({ name, is_group: true });
    const participants = participantIds.map((user_id) => ({
      room_id: room.id,
      user_id,
    }));
    await ChatRoomParticipant.bulkCreate(participants);

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
