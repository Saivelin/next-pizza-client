import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {categories: [{id: 1, title: "cat", value: "val"}]}

export const change = createAction("CHANGE")

export default createReducer(initialState, {
    [change]: function(state){
        state.count = state.count + 1
    }
})

console.log(change)