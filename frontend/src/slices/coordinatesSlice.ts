import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type currentPlayInfo = {
  time: number | undefined;
  totalRounds: number | undefined;
  opponentsName: string | undefined;
};

type RoundResult = {
  playerName: string;
  length: number;
  score: number;
  stats: {
    wins: number;
    losses: number;
    totalScore: number;
    rounds: number;
  };
};

interface CoordinatesState {
  mapCoordinates: number[];
  panoramaCoordinates: number[];
  round: number;
  grade: number | undefined;
  currentPlayInfo: currentPlayInfo;
  isGameEnded: boolean;
  roundResults: RoundResult[]; 
  partyId: string | undefined
}

// Define the initial state
const initialState: CoordinatesState = {
  mapCoordinates: [],
  panoramaCoordinates: [],
  round: 1,
  grade: undefined,
  currentPlayInfo: {
    time: 30,
    totalRounds: 5,
    opponentsName: undefined,
  },
  isGameEnded: false,
  roundResults: [], // Initialize as an empty array
  partyId: undefined
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setMapCoords(state, action: PayloadAction<number[]>) {
      state.mapCoordinates = action.payload;
    },
    setPanoramaCoords(state, action: PayloadAction<number[]>) {
      state.panoramaCoordinates = action.payload;
    },
    addRound(state) {
      state.round += 1;
    },
    setCurrentPlayInfo(state, action: PayloadAction<currentPlayInfo>) {
      state.currentPlayInfo.time = action.payload.time;
      state.currentPlayInfo.totalRounds = action.payload.totalRounds;
      state.currentPlayInfo.opponentsName = action.payload.opponentsName;
    },
    setGameEnd(state) {
      state.isGameEnded = true;
    },
    updateRoundResults(state, action: PayloadAction<RoundResult[]>) {
      state.roundResults = action.payload;
    },
    setPartyIdInRedux(state, action: PayloadAction<string>) {
      state.partyId = action.payload
    }
  },
});

export const {
  setMapCoords,
  setPanoramaCoords,
  addRound,
  setCurrentPlayInfo,
  setGameEnd,
  updateRoundResults,
  setPartyIdInRedux
} = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
