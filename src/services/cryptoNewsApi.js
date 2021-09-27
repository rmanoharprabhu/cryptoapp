import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NEWS_BASE_URL, NEWS_HOST_URL, NEWS_HOST_KEY, NEWS_READUCER_PATH} from '../components/constant';

const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': NEWS_HOST_URL,
    'x-rapidapi-key': NEWS_HOST_KEY
}

const baseUrl = NEWS_BASE_URL;

const createRequest = (url) => ({url, headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: NEWS_READUCER_PATH,
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: (paramType) => createRequest(`/search?q=${paramType.category}&safeSearch=off&textFormat=Raw&freshness=Day&count=${paramType.count}`),
        })
    })
});

export const {
    useGetCryptosNewsQuery,
}  = cryptoNewsApi;