import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Query } from '../../types/query'
import type { RootState } from '../store'
// const sample_results = [{}]


export interface Result {
    url: string;
    title: string;
    body: string;
    idx: number;
}

export interface ResultsState {
    results: Result[];
    error?: boolean;
    loading: false;
}


const initialState: ResultsState = {
    results: [],
    error: undefined,
    loading: false,
}


export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        getResults: (state,action:PayloadAction<Query>) => {
     
        },
        searchSuccess: (state) => {
            
        },
        searchFailure: (state) => {

        },
    }
})

export const { getResults, searchSuccess, searchFailure } = resultsSlice.actions

export const selectResults = (state:RootState) => state.results.results



