import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Result,ResultsState } from '../results/resultsSlice'
import { QueryState } from '../query/querySlice'

const SAMPLE_URL = "https://gist.githubusercontent.com/inwonakng/ee7a3ff67fc67f334a89bed81080f293/raw/78fe60828e26ff59d4e67824565c699f5dbcba0d/sample.json"
const BASE_URL = ""

// Define a service using a base URL and expected endpoints
export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: SAMPLE_URL }),
  endpoints: (builder) => ({
    getResults: builder.query<Result[], QueryState>({
      query: (query) => `?text=${query.text}`,
      // query: (query) => setTimeout(() => `?text=${query.text}`, 000)
    }),
  }),
})

export const { useGetResultsQuery } = searchApi