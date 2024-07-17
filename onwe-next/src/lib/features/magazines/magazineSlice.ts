import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Magazine{
    id: number;
    title: string;
    media: string[]
}

interface MagazineState{
    selectedMagazine: Magazine | null;
}

const initialState: MagazineState = {
    selectedMagazine: null
}

const magazineSlice = createSlice({
    name: "magazine",
    initialState,
    reducers: {
      selectMagazine: (state, action: PayloadAction<Magazine | null>) => {
        state.selectedMagazine = action.payload;
      },
      removeMagazine: (state) => {
        state.selectedMagazine = null;
      },
      },
  });
  
  export const { selectMagazine  } = magazineSlice.actions;
  export default magazineSlice.reducer;
  