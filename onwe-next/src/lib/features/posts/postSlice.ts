import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  post: {};
}

const initialState: PostState = {
  post: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<{}>) => {
      state.post = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;

// export type PostReducer = typeof postSlice.reducer;
