const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/users");


app.use(cors()); // Allow CORS for Express routes
app.use(express.json())
app.use("/users", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST"],
  },
});

const PORT = 3001;

// Data stores
let players = {}; // Connected players
let parties = {}; // Active parties

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle player joining the server
  socket.on("joinGame", (username) => {
    players[socket.id] = username;
    console.log(`${username} joined the game.`);
    io.emit("updatePlayers", players);
  });

  // Handle party creation
  socket.on("createParty", ({ gameName, partyId, username }) => {
    if (!parties[partyId]) {
      parties[partyId] = {
        id: partyId,
        name: gameName,
        host: username,
        players: [username],
      };
      console.log(`${username} created party: ${gameName} (ID: ${partyId})`);
      socket.join(partyId);
      io.to(partyId).emit("partyCreated", {
        message: `Сессия ${gameName} с ${partyId} создана.`,
        party: parties[partyId],
      });
    } else {
      console.log(`Party with ID ${partyId} already exists.`);
    }
  });

  // Emit detailed party information on joining
  socket.on("joinParty", ({ partyId, username }) => {
    const party = parties[partyId];
    if (party) {
      party.players.push(username);
      socket.join(partyId);
      console.log(`${username} joined party: ${partyId}`);
      io.to(partyId).emit("updateParty", {
        message: `Вы присоединились к сессии ${party.name} с ID ${party.id}. Количество игроков: ${party.players.length}.`,
        party,
      });
    } else {
      console.log(`Party with ID ${partyId} does not exist.`);
      socket.emit("error", { message: `Party with ID ${partyId} not found.` });
    }
  });

  // Handle custom player disconnect
  socket.on("customDisconnect", (username) => {
    console.log(`${username} has disconnected.`);
    removePlayerFromParties(username);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });

  socket.on("roundComplete", (data) => {
    console.log("Round data received:", data);
    // data = { round, userCoords, panoramaCoords, length }
    // Здесь можно сохранить данные в базу или обработать их по логике игры
  });

  // Handle socket disconnecting
  socket.on("disconnect", () => {
    const username = players[socket.id];
    if (username) {
      console.log(`Socket ${socket.id} (${username}) disconnected.`);
      removePlayerFromParties(username);
      delete players[socket.id];
      io.emit("updatePlayers", players);
    } else {
      console.log(`Socket ${socket.id} disconnected.`);
    }
  });

  // Utility function to remove a player from all parties
  function removePlayerFromParties(username) {
    Object.keys(parties).forEach((partyId) => {
      const party = parties[partyId];
      const playerIndex = party.players.indexOf(username);
      if (playerIndex !== -1) {
        party.players.splice(playerIndex, 1);
        console.log(`${username} removed from party: ${partyId}`);
        if (party.players.length === 0) {
          // Delete party if empty
          delete parties[partyId];
          console.log(`Party ${partyId} deleted because it is empty.`);
        } else {
          io.to(partyId).emit("updateParty", party);
        }
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
