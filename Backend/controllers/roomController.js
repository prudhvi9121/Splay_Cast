const Room = require('../models/Room');
const { v4: uuidv4 } = require('uuid');

// Create a Room
const createRoom = async (req, res) => {
  const { roomName, adminName } = req.body;
  const generateShortRoomId = () => uuidv4().split('-')[0];
  const roomId = generateShortRoomId();

  const newRoom = new Room({
    name: roomName,
    admin: adminName,
    roomId,
    members: [],
    messages: [],
  });

  try {
    await newRoom.save();
    res.status(201).json({
      message: 'Room created successfully',
      room: { roomName, adminName, roomId },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error });
  }
};

// Request to Join a Room
const requestJoinRoom = async (req, res) => {
  const { roomId, userName } = req.body;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.members.push({ userName, status: 'pending' });
    await room.save();

    res.json({ message: 'Join request sent to the admin' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting to join', error });
  }
};

// Handle Join Request (Accept/Deny)
const handleJoinRequest = async (req, res) => {
  const { roomId, userName, accept } = req.body;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const member = room.members.find((m) => m.userName === userName);
    if (!member) return res.status(404).json({ message: 'User not found in room' });

    member.status = accept ? 'joined' : 'denied';
    await room.save();

    res.json({
      message: accept
        ? `${userName} successfully added to the room`
        : `${userName} was denied access to the room`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error handling join request', error });
  }
};

module.exports = {
  createRoom,
  requestJoinRoom,
  handleJoinRequest,
};
