import React, { useState } from 'react';
import { useAppSelector,useAppDispatch } from '../../redux/hooks';

import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './SearchBar.css';
import { Typography,Button,Image, Input,AutoComplete,Popover,Slider,InputNumber,Row,Col } from 'antd';
import * as qs from 'qs'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Query,emptyQuery } from '../../types/query'
import { addHistory, getHistory } from '../../redux/searchHistory/searchHistorySlice';
import { SettingOutlined } from '@ant-design/icons'
import { to_url,from_url } from '../../types/query';

import {random} from './randomqueries.js'
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
	const navigate = useNavigate()
	const [state,setstate] = useState({query:prevSearch,showsetting:false})

	const searchhistory = useAppSelector((state) => getHistory(state))
	const suggestions = searchhistory.map(v => ({value:v.text}))

	console.log(searchhistory)

	const settext = (t:string) => setstate({...state,query:{...state.query,text:t}})
	const setshowsetting = (v:boolean) => setstate({...state,showsetting:v})
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
		console.log(`/results?${to_url(state.query)}`)
		navigate(`/results?${to_url(state.query)}`,{replace:true})

	}

	const onPressSettings = () => {
		setshowsetting(!state.showsetting)
	}

	// when user presses regular search
	const onPressRandom = () => {
		navigate(`/results?${qs.stringify({...state.query,text:random[~~(Math.random()*100)]})}`)
	}

	const onPageSizeChange = (value:number) => {
		setstate({...state,query:{...state.query,page_size:value}})
	}

	const settingsMenu =(<>

		<Row>
			<Text>Page Size</Text>
		</Row>
		<Row>
			<Col span={15}>
			<Slider
				min={10}
				max={50}
				onChange={onPageSizeChange}
				value={state.query.page_size}
			/>
			</Col>
			<Col span={4}>
			<InputNumber
				min={10}
				max={50}
				style={{ margin: '0 16px' }}
				value={state.query.page_size}
				onChange={onPageSizeChange}
			/>
			</Col>
		</Row>
	</>)


	const rendertype = fullscreen ? 'fullscreen': 'partial'

	return (
		<div className={`SearchBar ${rendertype}`}>
			<div className={`settings-menu ${rendertype}`}>
				<Popover
					visible={state.showsetting}
					content={settingsMenu}
					placement='leftTop'
					trigger='click'
					onVisibleChange={()=>setshowsetting(!state.showsetting)}
				>
					<Button
						type='text'
						onClick={onPressSettings}
					>
						<SettingOutlined style={{fontSize:'20px'}}/>
					</Button>
					

				</Popover>
			</div>
			<div className={`logo ${rendertype}`}>
				<Link to='/'>
					<Image src={logo} preview={false} />
				</Link>
			</div>
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
				<div className={`btnGroup ${rendertype}`}>
					{fullscreen?
					<Button 
						className={`searchBtn ${rendertype}`}
						type='primary'
						onClick={onPressSearch}
					>
						<Link to={state.query.text.length > 0 ? 
									`/results?${to_url(state.query)}`
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
						<Text style={{color:'#1890ff'}}>
							{fullscreen ? 'Random results of the day!' : 'test my luck'}
						</Text>
					</Button>
				</div>
			</div>
		</div>
	)
}


export default SearchBar
