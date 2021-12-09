import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { }
import type { RootState } from '../store'

export interface UserSetting {
    key: string;
    value: string;
}

export interface User {
    id: string;
    settings:UserSetting[]
}


export const defaultUser: User = {
    id: 'defaultUser',
    settings: []
}


export const userSlice = createSlice({
    name: 'user',
    initialState: defaultUser,
    reducers: {
        setSettings: (state, action: PayloadAction<UserSetting>) => {
            state.settings = {...state.settings,[action.payload.key]:action.payload.value}
        },
        setId: (state, action:PayloadAction<string>) => {
            state.id = action.payload
        }
        // add more listners for more inputs
        // changeInput: (state) => {
            
        // },
        // searchfail: (state) => {

        // },
    }
})



export const { setSettings,setId } = userSlice.actions

export const getId = (state:RootState) => state.user.id
export const getSettings = (state:RootState) => state.user.settings

export default userSlice.reducer