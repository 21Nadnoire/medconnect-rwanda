import db from '../config/db.js';

// Create or get conversation
export const createConversation = async (req, res) => {
  const { participant1_id, participant2_id } = req.body;
  const sortedIds = [participant1_id, participant2_id].sort();

  console.log('Create conversation request:', sortedIds);

  try {
    const [existing] = await db.query(
      'SELECT * FROM conversations WHERE participant1_id = ? AND participant2_id = ?',
      [sortedIds[0], sortedIds[1]]
    );

    if (existing.length > 0) {
      console.log('Conversation already exists:', existing[0]);
      return res.json(existing[0]);
    }

    const [insertResult] = await db.query(
      'INSERT INTO conversations (participant1_id, participant2_id) VALUES (?, ?)',
      [sortedIds[0], sortedIds[1]]
    );

    console.log('Inserted conversation with ID:', insertResult.insertId);
    res.json({
      id: insertResult.insertId,
      participant1_id: sortedIds[0],
      participant2_id: sortedIds[1]
    });
  } catch (err) {
    console.error('Error handling conversation:', err);
    res.status(500).send(err);
  }
};

// Get all conversations for a user
export const getUserConversations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [results] = await db.query(
      'SELECT * FROM conversations WHERE participant1_id = ? OR participant2_id = ?',
      [userId, userId]
    );
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  const { conversation_id, sender_id, message } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO messages (conversation_id, sender_id, message) VALUES (?, ?, ?)',
      [conversation_id, sender_id, message]
    );
    res.json({ id: result.insertId, conversation_id, sender_id, message });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get messages from a conversation
export const getMessages = async (req, res) => {
  const conversationId = req.params.conversationId;

  try {
    const [results] = await db.query(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY timestamp ASC',
      [conversationId]
    );
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// ✅ Start conversation and send first message
export const startConversationAndSendMessage = async (req, res) => {
  console.log('📩 Received /start request with body:', req.body);

  const { participant1_id, participant2_id, message } = req.body;
  const sortedIds = [participant1_id, participant2_id].sort();

  try {
    const [existing] = await db.query(
      'SELECT * FROM conversations WHERE participant1_id = ? AND participant2_id = ?',
      [sortedIds[0], sortedIds[1]]
    );

    let conversationId;

    if (existing.length > 0) {
      console.log('🟢 Existing conversation:', existing[0]);
      conversationId = existing[0].id;
    } else {
      const [insertResult] = await db.query(
        'INSERT INTO conversations (participant1_id, participant2_id) VALUES (?, ?)',
        [sortedIds[0], sortedIds[1]]
      );
      conversationId = insertResult.insertId;
      console.log('🆕 Created new conversation with ID:', conversationId);
    }

    const [messageResult] = await db.query(
      'INSERT INTO messages (conversation_id, sender_id, message) VALUES (?, ?, ?)',
      [conversationId, participant1_id, message]
    );

    console.log('✅ Message inserted with ID:', messageResult.insertId);

    res.status(200).json({
      conversationId,
      messageId: messageResult.insertId,
      sender_id: participant1_id,
      message,
    });

  } catch (error) {
    console.error('❌ Error in startConversationAndSendMessage:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
