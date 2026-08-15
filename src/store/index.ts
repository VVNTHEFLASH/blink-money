import { configureStore } from "@reduxjs/toolkit";

import borrowReducer from "./slices/borrowSlice";
import rewardsReducer from "./slices/rewardsSlice";
import saveReducer from "./slices/saveSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rewards: rewardsReducer,
    save: saveReducer,
    borrow: borrowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
