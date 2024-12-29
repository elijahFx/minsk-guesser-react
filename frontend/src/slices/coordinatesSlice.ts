import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type currentPlayInfo = {
    time: number | undefined,
    totalRounds: number | undefined,
    opponentsName: string | undefined
}

interface CoordinatesState {
  mapCoordinates: number[]; 
  panoramaCoordinates: number[];
  round: number;
  grade: number | undefined;
  currentPlayInfo: currentPlayInfo,
  isGameEnded: boolean
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
    opponentsName: undefined
  },
  isGameEnded: false
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
      state.round += 1
    },
    setCurrentPlayInfo(state, action: PayloadAction<currentPlayInfo>) {
      state.currentPlayInfo.time = action.payload.time
      state.currentPlayInfo.totalRounds = action.payload.totalRounds
      state.currentPlayInfo.opponentsName = action.payload.opponentsName
    },
    setGameEnd(state) {
      state.isGameEnded = true
    }
  },
});

export const { setMapCoords, setPanoramaCoords, addRound, setCurrentPlayInfo, setGameEnd } = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
