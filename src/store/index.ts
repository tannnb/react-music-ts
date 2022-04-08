import {configureStore} from "@reduxjs/toolkit";
import playReducer from './playSlice'
const store = configureStore({
    reducer: {
        play: playReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
