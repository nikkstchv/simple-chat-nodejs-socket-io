const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

server.listen(3001);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

connections = [];

io.sockets.on("connection", function (socket) {
  console.log("Connected");
  connections.push(socket);

  socket.on("disconnected", function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected");
  });

  socket.on("send_mess", function (data) {
    io.sockets.emit("add_mess", { mess: data.mess, name: data.name });
  });
});
