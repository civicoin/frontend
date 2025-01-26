import { configureStore } from "@reduxjs/toolkit";

import { accessTokenReducer } from "@/shared/models";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

declare global {
  /**
   * FSD
   *
   * Its hack way to export redux inferring types from @/app
   * and use it in @/shared/model/hooks.ts
   */
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
