import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "@/features/auth/authSlice";
import { loadingSlice } from "@/features/loading/loadingSlice";

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  auth: authSlice.reducer
});

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat();
    },
    preloadedState
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
