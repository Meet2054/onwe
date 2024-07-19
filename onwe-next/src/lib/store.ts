// store.ts
import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./features/events/eventsSlice";
import authReducer from "./features/auth/authSlice";
import exploreReducer from "./features/explore/exploreSlice";
import postReducer from "./features/posts/postSlice";
import magazineReducer from "./features/magazines/magazineSlice";
import userReducer from "./features/user/userSlice";
import tabReducer from "./features/clubs/tabSlice"
const store = configureStore({
  reducer: {
    events: eventsReducer,
    auth: authReducer,
    explore: exploreReducer,
    post: postReducer,
    magazine: magazineReducer,
    user: userReducer,
    tab: tabReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
