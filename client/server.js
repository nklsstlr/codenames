const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const distPath = path.join(__dirname, "dist");

const router = require("./src/api/router");

const server = http.createServer(app);
const io = socketio(server);
// the __dirname is the current directory from where the script is running
app.use(express.static(distPath));

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", (name, callback) => {
    // console.log(name);
    // const x = { users: getUsers()};
    // console.log("x "+x.users)
    // var usss = x.users.find((user) => user.name === name)
    // console.log("user from " + usss)
    // console.log("### "+getUser("niklas"))
    // if(getUsers().find((user) => user.name === name)){
    //   console.log("hallooo")
    //     return callback();
    // }
    console.log("## " + userExist(name));

    const { error, user } = addUser({ id: socket.id, name });

    if (error) return callback(error);

    io.emit("onlineUsers", { users: getUsers() });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECT KAM AN");
    const user = removeUser(socket.id);
    io.emit("onlineUsers", { users: getUsers() });

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("*", function (req, res) {
  res.sendFile(path.join(distPath, "index.html"));
});

server.listen(port);
