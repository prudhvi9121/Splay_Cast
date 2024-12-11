const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const {Server} = require('socket.io');
const http = require('http');

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const Room = require('./models/Room');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*"}});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth',authRoutes);
app.use('/api/rooms',roomRoutes);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('join-room', ({ roomId, userName }) => {
      Room.findOne({ roomId }).then(room => {
        if (room) {
          const member = room.members.find(m => m.userName === userName && m.status === 'joined');
          if (member) {
            socket.join(roomId);
            member.socketId = socket.id;
            room.save();
            io.to(roomId).emit('user-joined', `${userName} has joined the room`);
          }
        }
      });
    });
  
    socket.on('send-message', ({ roomId, userName, message }) => {
      Room.findOne({ roomId }).then(async room => {
        if (room) {
          const newMessage = { user: userName, message, timestamp: new Date() };
          room.messages.push(newMessage);
          await room.save();
          io.to(roomId).emit('receive-message', newMessage);
        }
      });
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
