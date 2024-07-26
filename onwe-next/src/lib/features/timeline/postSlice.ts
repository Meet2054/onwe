import { PostsProps } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { timeline: PostsProps[] | null } = {
  timeline: [],
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTimeline: (state, action: PayloadAction<PostsProps[]>) => {
      state.timeline = action.payload;
    },
  },
});

export const { setTimeline } = timelineSlice.actions;

export default timelineSlice.reducer;

// export type PostReducer = typeof postSlice.reducer;
