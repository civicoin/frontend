import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type JWTToken = string | null;
const initialAccessToken: JWTToken = localStorage.getItem("accessToken");

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: initialAccessToken,
  reducers: {
    setAccessToken: (_, action: PayloadAction<JWTToken>) => {
      localStorage.setItem("accessToken", action.payload!);
      return action.payload;
    },
    clearAccessToken: () => {
      localStorage.removeItem("accessToken");
      return null;
    },
  }
});

export const getToken = (state: RootState) => state.accessToken;

export const { setAccessToken, clearAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
