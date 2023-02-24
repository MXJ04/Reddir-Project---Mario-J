import { createSlice } from '@reduxjs/toolkit';

export const childrenOptions = {
    name: "children",
    initialState: [],
    reducers: {
        setFirstChildren: (state, action) => {
            return state = action.payload;
        },
        setNextChildren : (state, action) => {
            (action.payload.forEach((element) => {
                return state.push(element)}))
        } 

    }
}

export const childrenSlice = createSlice(childrenOptions);
export const selectFirstChildren = (state) => state.children;
export const {setFirstChildren, setNextChildren} = childrenSlice.actions;
export default childrenSlice.reducer;  