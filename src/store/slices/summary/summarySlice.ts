import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSummary: false
}

export const summarySlice = createSlice({
    name: "summary",
    initialState,
    reducers: {
        toggleSummary: (state) => {
            state.showSummary = !state.showSummary
        }
    }
})

export const { toggleSummary } = summarySlice.actions;
export default summarySlice.reducer;