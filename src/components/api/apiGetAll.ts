import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Logo from "../Libs/urls";
import { CardSliderData } from "../Libs/type/types";
import supabase from "../Libs/supabase/subpabase";
type types = {
    bol: boolean,
    id: number
}

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
        toggleHeart: builder.mutation<CardSliderData, types>({
            queryFn: async ({ id, bol }) => {
                try {
                    const { data, error } = await supabase
                        .from("myRequest")
                        .update({ hearts: bol }) // Обновляем значение булевым типом
                        .eq("id", id)
                        .select()
                        .single(); // Получаем обновленную запись

                    if (error) {
                        return {
                            error: {
                                status: 400,
                                data: error.message,
                            },
                        };
                    }

                    return { data }; // Успешный результат
                } catch (e) {
                    console.error(e);

                    return {
                        error: {
                            status: 500,
                            data: "Internal Server Error",
                        },
                    };
                }
            },
        }),
        toggleFavorite: builder.mutation<CardSliderData, types>({
            queryFn: async ({ id, bol }) => {
                try {
                    const { data, error } = await supabase
                        .from("myRequest")
                        .update({ trash: bol }) // Обновляем значение булевым типом
                        .eq("id", id)
                        .select()
                        .single(); // Получаем обновленную запись

                    if (error) {
                        return {
                            error: {
                                status: 400,
                                data: error.message,
                            },
                        };
                    }

                    return { data }; // Успешный результат
                } catch (e) {
                    console.error(e);

                    return {
                        error: {
                            status: 500,
                            data: "Internal Server Error",
                        },
                    };
                }
            },
        }),

    })
})
export const { useGetallcardQuery, useSliderQuery, useCardQuery, useToggleFavoriteMutation, useToggleHeartMutation } = apiGet