import React from 'react';
import * as qs from 'qs'

import SearchBar from '../../components/SearchBar/SearchBar';
import OneResult from '../../components/OneResult/OneResult';
import SearchLoader from '../../components/SearchLoader/SearchLoader'

import { useAppSelector,useAppDispatch } from '../../redux/hooks';
import { getQuery, setQuery } from '../../redux/query/querySlice';
import { useGetResultsQuery } from '../../redux/services/search';
import { Typography } from 'antd'

import './ResultsPage.css';

const { Text } = Typography
// import AnimatedLoader,{} from 'react-native-animated-loader';

const ResultsPage = () => {
    const params = useAppSelector((state)=>getQuery(state))
    // const loading = useAppSelector((state)=>isLoading(state))
    // const error = useAppSelector((state)=>getError(state))
    const dispatch = useAppDispatch()
    dispatch(setQuery(params))
    const { data, error, isLoading } = useGetResultsQuery(params)
    console.log('results page')
    // console.log(data)
    // let isLoading = false
    // let error = undefined
    // let data = [{title:'result1',body:'body',idx:0,url:'google.com'}]
    // let error = undefined

    // setTimeout(()=>{isLoading=false; error='ERRORhere';console.log('we did it')}, 10000)

    return(
        <div className="ResultsPage">
            <SearchBar fullscreen={false} />{
            isLoading 
            ?   <div className="loading">
                    <SearchLoader/>
                    <Text>Loading</Text>
                </div>
            :   error === undefined && data !== undefined && data.length > 0
                ?
                data.map( (r,i) =>
                    <OneResult idx={i} title={r.title} body={r.body} url={r.body} key={r.title+i} />
                )
                :
                // <View></View>
                <Text>Error!</Text>
                // <OneResult idx={0} title={'Error'} body={error} url={''}/>
                }
        </div>
    )
}

export default ResultsPage;