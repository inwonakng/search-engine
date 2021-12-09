import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import * as qs from 'qs'
import { Query } from '../../types/query'

export interface searchHistory {
    queries: Query[]
}


export const emptyHistory: searchHistory = {
    queries: []
}


export const searchHistorySlice = createSlice({
    name: 'searchHistory',
    initialState: emptyHistory,
    reducers: {
        addHistory: (state, action: PayloadAction<Query>) => {
            // state.text = action.payload.text
            state.queries.push(action.payload)
        },
        // add more listners for more inputs
        // changeInput: (state) => {
            
        // },
        // searchfail: (state) => {

        // },
    }
})



export const { addHistory } = searchHistorySlice.actions

export const getHistory = (state:RootState) => state.searchHistory.queries

export default searchHistorySlice.reducer