const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { evaluateDistance } = require("./evaluateGame");

const app = express();
const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
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
let scores = {}; // Player scores
let gameInfo = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("requestGameInfo", () => {
    socket.emit("gameInfo", gameInfo); // Передача текущего состояния gameInfo
  });

  socket.on("joinGame", (username) => {
    players[socket.id] = username;
    scores[username] = { wins: 0, losses: 0, totalScore: 0, rounds: 0 };
    console.log(`${username} joined the game.`);
    io.emit("updatePlayers", players);
  });

  socket.on("createParty", ({ gameName, partyId, username, rounds, time }) => {
    if (!parties[partyId]) {
      parties[partyId] = {
        id: partyId,
        name: gameName,
        host: username,
        players: [username],
        rounds: rounds || 3, // Значение по умолчанию 3
        time: time || 60, // Значение по умолчанию 60 секунд
      };
      console.log(
        `${username} created party: ${gameName} (ID: ${partyId}) with ${rounds} rounds and ${time} seconds.`
      );
      socket.join(partyId);
      io.to(partyId).emit("partyCreated", {
        message: `Клиент, сессия ${gameName} с ${partyId} создана. Раунды: ${rounds} по ${time} секунд`,
        party: parties[partyId],
      });
    } else {
      console.log(`Party with ID ${partyId} already exists.`);
    }
  });

  socket.on("joinParty", ({ partyId, username }) => {
    const party = parties[partyId];
    if (party) {
      if (party.players.length >= 2) {
        console.log(
          `${username} tried to join party ${partyId}, but it is full.`
        );
        socket.emit("error", { message: `Party ${party.name} is full.` });
        return;
      }
      party.players.push(username);
      socket.join(partyId);

      console.log(`username: ${username}`);
      

      gameInfo = {
        totalRounds: party.rounds,
        time: party.time,
        opponentsName: username
      };

      console.log(`${username} joined party: ${partyId}`);

      const roundFromFront = parties[partyId].rounds;
      const timeFromFront = parties[partyId].time;

      const totalRounds = roundFromFront;
      const time = timeFromFront;

      gameInfo = { totalRounds: roundFromFront, time: timeFromFront, opponentsName: username };

      console.log(totalRounds, time);

      party.totalRounds = roundFromFront;
      party.time = timeFromFront;

      io.to(partyId).emit("gameInfo", gameInfo);

      io.to(partyId).emit("updateParty", {
        message: `Вы присоединились к сессии ${party.name} с ID ${party.id}. Количество игроков: ${party.players.length}.`,
        party,
      });

      // Уведомление создателя партии, если второй игрок подключился
      if (party.players.length === 2) {
        const creatorSocketId = Object.keys(players).find(
          (id) => players[id] === party.host
        );

        console.log(players);
        

        if (creatorSocketId) {
          io.to(creatorSocketId).emit("partyReady", {
            message: `Ваша партия ${party.name} теперь готова! Второй игрок подключился.`,
          });

          console.log(Object.keys(players));
        }
        io.to(partyId).emit("gameSettings", { totalRounds, time });
      }
    } else {
      console.log(`Party with ID ${partyId} does not exist.`);
      socket.emit("error", { message: `Party with ID ${partyId} not found.` });
    }
  });

  socket.on("roundComplete", ({ partyId, results }) => {
    const party = parties[partyId];
    console.log(parties);

    if (party && party.players.length === 2) {
      const [player1, player2] = party.players;
      const length1 = results[player1];
      const length2 = results[player2];

      const score1 = evaluateDistance(length1);
      const score2 = evaluateDistance(length2);

      if (length1 < length2) {
        scores[player1].wins += 1;
        scores[player2].losses += 1;
      } else if (length2 < length1) {
        scores[player2].wins += 1;
        scores[player1].losses += 1;
      }

      scores[player1].totalScore += score1;
      scores[player2].totalScore += score2;
      scores[player1].rounds += 1;
      scores[player2].rounds += 1;

      io.to(partyId).emit("roundResults", {
        results: {
          [player1]: { length: length1, score: score1, stats: scores[player1] },
          [player2]: { length: length2, score: score2, stats: scores[player2] },
        },
      });
    } else {
      console.log(`Invalid party or insufficient players in party ${partyId}`);
    }
  });

  socket.on("disconnect", () => {
    const username = players[socket.id];
    if (username) {
      console.log(`Socket ${socket.id} (${username}) disconnected.`);
      delete scores[username];
      delete players[socket.id];
      io.emit("updatePlayers", players);
    } else {
      console.log(`Socket ${socket.id} disconnected.`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
