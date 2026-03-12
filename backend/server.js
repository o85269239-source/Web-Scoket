import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import path from 'path';

const __dirname = path.resolve();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Adjust this to your frontend URL
  }
});

app.use(express.json());
app.use(cors());

const userId_Name={}
let roomIds = new Set();

export const isPresent=(roomId)=>{
    return roomIds.has(roomId)
}

export const createRoom=()=>{
    let roomId = Math.random().toString(36).substring(2,7)
    while(isPresent(roomId)){
        roomId = Math.random().toString(36).substring(2,7)
    }
    roomIds.add(roomId)
    return roomId
}

app.post('/create-room', (req, res) => {
  const roomId = createRoom();
  res.json({ roomId });
});

app.post('/is-room-present/', (req, res) => {
  const { roomId } = req.body;
  const present = isPresent(roomId);
  res.json({ exist: present });
});


io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  const {name,roomId} = socket.handshake.query;
  userId_Name[socket.id]=name;

  socket.on('disconnect', () => {
    console.log("user disconnected",userId_Name[socket.id]);
    delete userId_Name[socket.id];
  });
  socket.join(roomId);

  socket.to(roomId).emit("user-connected",name)
  socket.on("send-message",({message,senderName})=>{
    console.log(message,senderName);
    socket.to(roomId).emit("receive-message",{message,senderName})
  });
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get( (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});