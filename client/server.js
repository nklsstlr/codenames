const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
var reload = require("reload");
var connectLivereload = require("connect-livereload");
const livereload = require("livereload");

const distPath = path.join(__dirname, "dist");
// const { App } = require("./src/web/App");

const router = require("./src/api/router");

const server = http.createServer(app);
const io = socketio(server);
// the __dirname is the current directory from where the script is running

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(distPath);
app.use(connectLivereload());
app.use(express.static(distPath));

const {
  addUser,
  removeUser,
  getUsers,
  getUser,
  getUsersInRoom,
  userExist,
} = require("./src/api/users");

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", (name, callback) => {
    // console.log(name
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

if (app.get("env") === "development") {
  console.log("yes here");
  // Reload code here
  reload(app)
    .then(function (reloadReturned) {
      // reloadReturned is documented in the returns API in the README

      // Reload started, start web server
      server.listen(port, function () {
        console.log("Web server listening on port " + port);
      });
    })
    .catch(function (err) {
      console.error(
        "Reload could not start, could not start server/sample app",
        err
      );
    });
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
} else {
  server.listen(port);
}
