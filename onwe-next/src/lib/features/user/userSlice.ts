import { UserProfile } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: UserProfile | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
