import { PostsProps } from "@/components/post_component/Posts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  post: PostsProps;
}

const initialState: PostState = {
  post: {
    id: 0,
    title: "",
    description: "",
    userid: "",
    username: "",
    likes: 0,
    tags: "",
    media: [""],
    category: "",
    liked: false,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<PostsProps>) => {
      state.post = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;

// export type PostReducer = typeof postSlice.reducer;
