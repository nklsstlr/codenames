const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');


const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUsers, getUsersInRoom } = require('./users');

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name }, callback) => {
    console.log(name);
    const { error, user } = addUser({ id: socket.id, name});

    if(error) return callback(error);


    io.emit('onlineUsers', { users: getUsers()});

    callback();
  });

  socket.on('disconnect', () => {
    console.log("DISCONNECT KAM AN")
    const user = removeUser(socket.id);
    io.emit('onlineUsers', { users: getUsers()});

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


server.listen(process.env.PORT || 3002, () => console.log(`Server has started.`));