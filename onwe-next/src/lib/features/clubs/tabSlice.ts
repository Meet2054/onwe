import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tabState {
    tab: string;
  }
  
  const initialState: tabState = {
    tab: "general",
  };
  
  const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
      setClubTab: (state, action: PayloadAction<string>) => {
        state.tab = action.payload;
      },
    },
  });
  

  export const { setClubTab } = tabSlice.actions;

  export default tabSlice.reducer;