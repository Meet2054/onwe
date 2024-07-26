import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExploreState {
  search: boolean;
}

const initialState: ExploreState = {
  search: false,
};

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<boolean>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = exploreSlice.actions;

export default exploreSlice.reducer;
