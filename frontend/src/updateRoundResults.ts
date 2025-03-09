import { io } from "socket.io-client";
import { updateRoundResults } from "./slices/coordinatesSlice";
import { store } from "./store"; // Assuming you have a configured Redux store

// Initialize Socket.IO client
const socket = io("http://localhost:3001");

// Listen for round results
socket.on("roundResults", (data) => {
  // Transform results if needed
  const results = Object.entries(data.results).map(([playerName, result]) => ({
    playerName,
    //@ts-ignore
    length: result.length,
    //@ts-ignore
    score: result.score,
    //@ts-ignore
    stats: result.stats,
  }));

  // Dispatch results to Redux
  store.dispatch(updateRoundResults(results));
});

export default socket;
