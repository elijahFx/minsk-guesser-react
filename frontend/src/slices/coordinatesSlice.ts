import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CoordinatesState {
  mapCoordinates: number[]; 
  panoramaCoordinates: number[];
  round: number;
  grade: number | undefined
}

// Define the initial state
const initialState: CoordinatesState = {
  mapCoordinates: [],
  panoramaCoordinates: [],
  round: 1,
  grade: undefined
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
    }
  },
});

export const { setMapCoords, setPanoramaCoords, addRound } = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
