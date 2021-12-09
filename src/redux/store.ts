import { resultsSlice } from './results/resultsSlice'
import { querySlice } from "./query/querySlice";
import { userSlice } from './user/userSlice';
import { configureStore,combineReducers } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { searchApi } from './services/search';


const persistConfig = {
	key: 'root',
	version: 1,
    blacklist: [], //maybe results here
	storage:storage,
}

const rootReducer = combineReducers({
    results: resultsSlice.reducer,
    query: querySlice.reducer,
    user: userSlice.reducer,
	[searchApi.reducerPath]:searchApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}).concat(searchApi.middleware),
})

export const persistor = persistStore(store)


// export const store = configureStore({
//     reducer:{
//         results:resultsSlice.reducer,
//         query: querySlice.reducer,
//     }
// })

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
