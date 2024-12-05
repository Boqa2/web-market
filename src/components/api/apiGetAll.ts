import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Logo from "../Libs/urls";
import { CardSliderData } from "../Libs/type/types";
type types={
    gender:boolean,
    value:string
}

export const apiGet = createApi({
    reducerPath: "getCard",
    baseQuery: fetchBaseQuery({ baseUrl: `${Logo.urlTask}` }),
    endpoints: (builder) => ({
        getallcard: builder.query<CardSliderData[], string>({
            query: (gender) => `/cardimgs?gender=${gender}`,
        }),
        getFavoriteCard: builder.query<CardSliderData[], types>({
            query: ({gender, value}) => `/cardimgs?${value}=${gender}`,
        }),
        getcard: builder.query<CardSliderData, string>({
            query: (id) => `/cardimgs/${id}`,
        }),
        updatemencard:builder.mutation<CardSliderData[], {id:number, body:Partial<CardSliderData>  }>({
            query:({id, body})=> ({url: `/cardimgs/${id}`, method: "PATCH", body}),
        }),

    })
})
export const { useGetallcardQuery, useUpdatemencardMutation,useGetcardQuery, useGetFavoriteCardQuery} = apiGet