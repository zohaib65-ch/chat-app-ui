import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  memberSince: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  memberSince: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.memberSince = action.payload.memberSince;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.memberSince = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
