import React, { useState } from 'react';
import { useAppSelector,useAppDispatch } from '../../redux/hooks';

import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './SearchBar.css';
import { getQuery,setText,getText } from '../../redux/query/querySlice';
import { Typography,Button,Image, Input } from 'antd';
import * as qs from 'qs'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const { Text } = Typography
// declare prop types here
export type Props = {
	fullscreen?: boolean;
};

const SearchBar: React.FC<Props> = ({
	fullscreen = false,
}) => {
	const [showModal,setShowModal] = useState(false)
	const dispatch = useAppDispatch();
	const encodedQuery = qs.stringify(useAppSelector((state) => getQuery(state)))
	const querytext = useAppSelector((state)=>getText(state))

	// listener for input event on the text input
	const onInput = (e: React.FormEvent<HTMLInputElement>) => {
		dispatch(setText(e.currentTarget.value))
	}
	
	// when user presses regular search
	// const onPressSearch = () => {
	// 	// need to build the encoded url here and redirect to the page there
	// 	// the actual communication with the query team will happen on the results page, to account for cases where user directly goes to the results page
	// 	alert(querytext)
	// 	let history = useHistory()
	// 	history.push('path');
	// 	return
	// }
		

	// when user presses regular search
	const onPressRandom = () => {
		const randomquery = 'randomquery'
		dispatch(setText(randomquery))
	}

	return (
		<div className={fullscreen ? 'SearchBar fullscreen' : 'SearchBar partial'}>
			<Image src={logo} preview={false} />
			<div className='inner'>
				<Input className='searchInput'
					onChange ={onInput} 
					value={querytext}
				/>
				<AdvancedSearch/>				
				<div className='btnGroup'>
					<Button 
						className='searchBtn' 
						type='primary'
						// onClick={onPressSearch}
					>
						<Link to={`/results?${encodedQuery}`}>
							{fullscreen ? 
								<Text strong={true} style={{color:'white'}}>
									Search 
								</Text>
								: 'Go!'}
						</Link>
						</Button>
					<Button className='randomBtn' type='link' onClick={onPressRandom}>
						{fullscreen ? 'Random results of the day!' : 'test my luck'}
					</Button>
				</div>
			</div>
		</div>
	)
}


export default SearchBar