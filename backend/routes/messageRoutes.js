// backend/routes/messageRoutes.js
import express from 'express';
import {
  createConversation,
  getUserConversations,
  sendMessage,
  getMessages,
  startConversationAndSendMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/conversations', createConversation);
router.get('/conversations/:userId', getUserConversations);
router.post('/messages', sendMessage);
router.get('/messages/:conversationId', getMessages);
router.post('/start', startConversationAndSendMessage);


export default router;
