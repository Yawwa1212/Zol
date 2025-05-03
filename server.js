const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const PORT = process.env.PORT || 3000;
const players = {};

io.on("connection", (socket) => {
  socket.emit("init", players);

  socket.on("new", (data) => {
    players[data.id] = { x: data.x, y: data.y };
    io.emit("new", data);
  });

  socket.on("move", ({ id, y }) => {
    if (players[id]) players[id].y = y;
    io.emit("move", { id, y });
  });

  socket.on("disconnect", () => {
    for (let id in players) {
      if (players[id].socketId === socket.id) {
        delete players[id];
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
