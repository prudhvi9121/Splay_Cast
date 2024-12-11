const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  admin: String, // User who created the room
  roomId: { type: String, unique: true },
  members: [
    {
      userName: String,
      socketId: String,
      status: { type: String, enum: ['pending', 'joined'], default: 'pending' },
    },
  ],
  messages: [
    {
      user: String,
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Room', RoomSchema);
