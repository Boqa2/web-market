import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Logo from "../Libs/urls";
import { CardSliderData } from "../Libs/type/types";
import supabase from "../Libs/supabase/subpabase";
// type types = {
//     gender: boolean,
//     value: string
// }

export const apiGet = createApi({
    reducerPath: "getCard",
    baseQuery: fetchBaseQuery({ baseUrl: `${Logo.urlTask}` }),
    endpoints: (builder) => ({
        getallcard: builder.query<CardSliderData[], void>({
            queryFn: async () => {
                const { data, error } = await supabase.from("myRequest").select("*");
                //  .eq('done', false)

                if (error) console.log(error.message);

                return { data: data || [] };
            },
        }),
        slider: builder.query<CardSliderData[], void>({
            queryFn: async () => {
                const { data, error } = await supabase.from("cardSlide").select("*");
                //  .eq('done', false)

                if (error) console.log(error.message);

                return { data: data || [] };
            },
        }),
        card: builder.query<CardSliderData, number>({
            queryFn: async (id) => {
                const { data, error } = await supabase
                .from('myRequest') // Укажите вашу таблицу
                .select('*')
                .eq('id', id)
                .single(); 

                if (error) console.log(error.message);

                return { data: data || [] };
            },
        }),
        // getFavoriteCard: builder.query<CardSliderData[], types>({
        //     query: ({ gender, value }) => `/cardimgs?${value}=${gender}`,
        // }),
        // getcard: builder.query<CardSliderData, string>({
        //     query: (id) => `/cardimgs/${id}`,
        // }),
        // updatemencard: builder.mutation<CardSliderData[], { id: number, body: Partial<CardSliderData> }>({
        //     query: ({ id, body }) => ({ url: `/cardimgs/${id}`, method: "PATCH", body }),
        // }),

    })
})
export const { useGetallcardQuery, /*useUpdatemencardMutation, useGetcardQuery, useGetFavoriteCardQuery,*/ useSliderQuery, useCardQuery } = apiGet