import React, { useState } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import OneResult from '../../components/OneResult/OneResult';
import SearchLoader from '../../components/SearchLoader/SearchLoader'

import { useAppSelector,useAppDispatch } from '../../redux/hooks';
import { useGetResultsQuery } from '../../redux/services/search';
import { Pagination, Typography } from 'antd'
import { Result } from '../../redux/results/resultsSlice';

import './ResultsPage.css';
import { useLocation } from 'react-router-dom';
import { Query,from_url, to_url } from '../../types/query';

const { Text } = Typography
// import AnimatedLoader,{} from 'react-native-animated-loader';

const ResultsPage = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const [state,setstate] = useState({ query:from_url(location.search)})
    // setstate({query:from_url(location.search)})
    console.log('results page', state.query)
    console.log('results page', from_url(location.search))
    
    // const query = useAppSelector((state)=>getQuery(state))
        // const loading = useAppSelector((state)=>isLoading(state))
    // const error = useAppSelector((state)=>getError(state))
    // console.log(useAppSelector((state)=>getQuery(state)))

    const { data, error, isLoading } = useGetResultsQuery(state.query)
    console.log(data)

    const onMovePage = (page:number,pageSize:number) => {
        console.log(state.query)
        setstate({...state,query:{...state.query,page_idx:page-1}})
        let params = from_url(location.search)
        params.page_idx = page-1
        window.history.replaceState('Results',`Page `,`${window.location.origin}${location.pathname}?${to_url(params)}`)
        // console.log(`${window.location.origin}${location.pathname}?${to_url(state.query)}`)
        // console.log(`${location.}?${to_url(state.query)}`)
    }

    const getSlice = (data: Result[]):Result[] => data.slice((state.query.page_idx)*state.query.page_size,(state.query.page_idx)*state.query.page_size+state.query.page_size)

    return(
        <div className="ResultsPage">
            <SearchBar fullscreen={false} prevSearch={state.query}/>{
            isLoading 
            ?   <div className="loading">
                    <SearchLoader/>
                    <Text>Loading</Text>
                </div>
            :   error === undefined && data !== undefined && data.length > 0 && from_url(location.search).text !== 'error'
                ?
                <>
                {getSlice(data).map( (r,i) =>
                    <OneResult idx={i} title={r.title} body={r.body} url={r.url} key={r.title+i} />
                )}
                <div className="PageCount">
                    <Pagination 
                        defaultCurrent={state.query.page_idx+1} 
                        total={data?.length}
                        pageSize={state.query.page_size}
                        onChange={onMovePage} 
                        showSizeChanger = {false}
                        />
                </div>
                </>
                :
                // <View></View>
                <Text>Error!</Text>
                // <OneResult idx={0} title={'Error'} body={error} url={''}/>
                }
        </div>
    )
}

export default React.memo(ResultsPage);