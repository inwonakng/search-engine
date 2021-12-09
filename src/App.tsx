import React from 'react';
import { Provider } from 'react-redux';

// import { Button, ThemeProvider } from 'react-native-elements';

import { BrowserRouter, Routes, Route } from "react-router-dom"; // <- i have no idea why this works but it does
import ResultsPage from './pages/ResultsPage/ResultsPage';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import SearchPage from './pages/SearchPage/SearchPage';


import { useAppSelector,useAppDispatch } from './redux/hooks';
import { setId,getId } from './redux/user/userSlice';
import { v4 as uuidv4 } from 'uuid'
import 'antd/dist/antd.css'
import './App.css'
// we need to separate out the router like this so we can take care of user id here.
// if the user id is undefined, lets generate a random id and save it to storage
const AppRouter = () => {
	// console.log(useAppSelector((state) => getId(state)))

	const dispatch = useAppDispatch()
	if(useAppSelector((state) => getId(state)) === undefined){
		dispatch(setId(uuidv4()))
	}

	return (
	<BrowserRouter>
		<Routes>
			<Route path="/results" element={<ResultsPage/>}/>	
			<Route path="/" element={<SearchPage/>}/>
		</Routes>
	</BrowserRouter>
	)
}


const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className='App'>
					<AppRouter/>
				</div>
			</PersistGate>
		</Provider>
	);
}




export default App;