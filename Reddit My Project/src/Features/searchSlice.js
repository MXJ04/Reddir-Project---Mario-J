import { createSlice } from '@reduxjs/toolkit';

export const searchOptions = {
    name: "search",
    initialState: '',
    reducers: {
        setSearchState: (state, action) => {
            return state = action.payload;
        }
    }
}

export const searchSlice = createSlice(searchOptions);
export const selectSearch = (state) => state.search;
export const {setSearchState} = searchSlice.actions;
export default searchSlice.reducer;  