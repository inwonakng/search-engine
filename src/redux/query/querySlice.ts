import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface QueryState {
    text: string;
}


export const emptyQuery: QueryState = {
    text:''
}


export const querySlice = createSlice({
    name: 'query',
    initialState: emptyQuery,
    reducers: {
        setQuery: (state, action: PayloadAction<QueryState>) => {
            // state.text = action.payload.text
            state = action.payload
        },
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        }
        // add more listners for more inputs
        // changeInput: (state) => {
            
        // },
        // searchfail: (state) => {

        // },
    }
})



export const { setQuery,setText } = querySlice.actions

export const getQuery = (state:RootState) => state.query
export const getText = (state:RootState) => state.query.text

export default querySlice.reducer