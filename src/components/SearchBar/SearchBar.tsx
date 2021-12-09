import React, { useState } from 'react';
import { useAppSelector,useAppDispatch } from '../../redux/hooks';

import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './SearchBar.css';
import { Typography,Button,Image, Input,AutoComplete } from 'antd';
import * as qs from 'qs'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { Query,emptyQuery } from '../../types/query'
import { addHistory, getHistory } from '../../redux/searchHistory/searchHistorySlice';

const { Text } = Typography
// declare prop types here
export type Props = {
	fullscreen?: boolean;
	prevSearch?: Query;
};

const SearchBar: React.FC<Props> = ({
	fullscreen = false,
	prevSearch = emptyQuery,
}) => {
	const dispatch = useAppDispatch()
	const [state,setstate] = useState({query:prevSearch})

	const searchhistory = useAppSelector((state) => getHistory(state))
	const suggestions = searchhistory.map(v => ({value:v.text}))

	console.log(searchhistory)

	const settext = (t:string) => setstate({...state,query:{...state.query,text:t}})
	// listener for input event on the text input
	const onInput = (e: React.FormEvent<HTMLInputElement>) => {
		console.log('go')
		settext(e.currentTarget.value)
		// dispatch(setText(e.currentTarget.value))
		console.log('back')
	}

	const onSuggestPress = (v:string,o:any) => {
		settext(v)
	}
	
	const onPressSearch = () => {
		// something something
		dispatch(addHistory(state.query))
	}

	// when user presses regular search
	const onPressRandom = () => {
		const randomquery = 'randomquery'
		// dispatch(setText(randomquery))
	}
	const rendertype = fullscreen ? 'fullscreen': 'partial'

	return (
		<div className={`SearchBar ${fullscreen ? 'fullscreen' : 'partial'}`}>
			<Image src={logo} preview={false} />
			<div className={`inner ${rendertype}`}>
			<AutoComplete
				dropdownMatchSelectWidth={252}
				style={{
					width: '80%',
				}}
				value={state.query.text}
				// filterOption={(inputValue, suggestions) =>
				// 	suggestions!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				// }
				options={suggestions}
				onSelect={onSuggestPress}
				// options={[{name:0,value:'firefox'},{name:1,value:'chrome'}]}
				// onSelect={onSelect}
				// onSearch={handleSearch}
				>
				<Input.Search
					className={`searchInput ${rendertype}`}
					onChange ={onInput} 
					value={state.query.text}
					onPressEnter={onPressSearch}
					enterButton={!fullscreen}
					width={'70%'}
				/>
					
			</AutoComplete>
				<AdvancedSearch/>				
				<div className={`btnGroup ${rendertype}`}>
					{fullscreen?
					<Button 
						className={`searchBtn ${rendertype}`}
						type='primary'
						onClick={onPressSearch}
					>
						<Link to={state.query.text.length > 0 ? 
									`/results?${qs.stringify(state.query)}`
								:''}>
							<Text strong={true} style={{color:'white'}}>
								Search 
							</Text>
						</Link>
					</Button>
					:
					<></>
					}
					<Button
						className={`randomBtn ${rendertype}`} 
						type='link' 
						onClick={onPressRandom}
					>
						{fullscreen ? 'Random results of the day!' : 'test my luck'}
					</Button>
				</div>
			</div>
		</div>
	)
}


export default SearchBar
