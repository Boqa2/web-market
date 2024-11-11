import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Logo from "../Libs/urls";
import { CardSliderData } from "../Card/CardWomenImg";

export const apiGet = createApi({
    reducerPath: "getCard",
    baseQuery: fetchBaseQuery({ baseUrl: `${Logo.urlTask}` }),
    endpoints: (builder) => ({
        getallcard: builder.query<CardSliderData[], void>({
            query: () => "/cardimgs",
        }),
        getcard: builder.query<CardSliderData, string>({
            query: (id) => `/cardimgs/${id}`,
        }),
        getwomencard: builder.query<CardSliderData[], void>({
            query: () => "/card4women",
        }),
        getwomscard: builder.query<CardSliderData, string>({
            query: (id) => `/card4women/${id}`,
        }),
        updatecard:builder.mutation<CardSliderData[], {id:number, body:Partial<CardSliderData>  }>({
            query:({id, body})=> ({url: `/card4women/${id}`, method: "PATCH", body}),
        }),
        updatemencard:builder.mutation<CardSliderData[], {id:number, body:Partial<CardSliderData>  }>({
            query:({id, body})=> ({url: `/cardimgs/${id}`, method: "PATCH", body}),
        }),

    })
})
export const { useGetallcardQuery, useGetwomencardQuery, useUpdatecardMutation,  useUpdatemencardMutation,useGetcardQuery, useGetwomscardQuery } = apiGet