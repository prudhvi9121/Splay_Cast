const express = require('express');
const {
  createRoom,
  requestJoinRoom,
  handleJoinRequest,
} = require('../controllers/roomController');

const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware')

// Define routes
router.post('/create-room', verifyToken, createRoom);
router.post('/request-join', verifyToken, requestJoinRoom);
router.post('/handle-join-request', verifyToken, handleJoinRequest);

module.exports = router;
