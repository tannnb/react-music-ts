import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from './index'
interface playSliceProps {
    value: number;
}
const initialState: playSliceProps = {
    value: 0,
};
export const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
    }
})

export const {increment} = playSlice.actions

export const getCurrentValue = (state: RootState) => state.play.value;

export default playSlice.reducer
