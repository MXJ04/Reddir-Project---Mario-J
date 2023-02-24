import {configureStore} from "@reduxjs/toolkit";
import subRedditReducer from "../Features/subRedditSlice";
import childrenReducer from "../Features/childrenSlice";
import searchReducer from "../Features/searchSlice"

const store = configureStore({
    reducer: {
        subReddit: subRedditReducer, 
        children: childrenReducer,
        search: searchReducer
    }
})

export default store;