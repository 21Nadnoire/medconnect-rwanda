// routes/chatRoutes.js
import express from 'express';
import {
  getOrCreatePrivateRoom,
  sendMessage,
  getMessages,
  createGroupRoom,
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/private-room', getOrCreatePrivateRoom);
router.post('/send-message', sendMessage);
router.get('/messages/:roomId', getMessages);
router.post('/group-room', createGroupRoom);

export default router;
