import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./StoreSlice.js";
const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
export default store;