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
  },
});

export const { setMapCoords, setPanoramaCoords } = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
