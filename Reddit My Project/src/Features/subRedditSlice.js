import { createSlice } from '@reduxjs/toolkit';

export const subRedditOptions = {
    name: "subReddit",
    initialState: '',
    reducers: {
        chooseSub: (state, action) => {
            return state = action.payload;
        }
    }
}

export const subRedditSlice = createSlice(subRedditOptions);
export const selectSubReddit = (state) => state.subReddit;
export const {chooseSub} = subRedditSlice.actions;
export default subRedditSlice.reducer;  