import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profileImage: string | null;
}

export interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: {
    id: "user-001",
    name: "VISHNUVARDHAN S",
    email: "",
    mobile: "8072673940",
    profileImage: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => ({
      currentUser: action.payload,
    }),
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
