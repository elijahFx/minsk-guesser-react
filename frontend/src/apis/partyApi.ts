import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Тип для партии
type Party = {
  name: string;
  host: string;
  rounds: number;
  time: number;
  map: string;
  id: string;
};

// Тип для присоединения к партии
type ConnectToPartyRequest = {
  partyId: string;
  username: string;
};

const URLS = ["http://localhost:3001"];
const BASE_URL = URLS[0];

export const partyApi = createApi({
  reducerPath: "partyApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Parties"],
  endpoints: (builder) => ({
    // Получение списка всех партий
    getParties: builder.query<Party[], void>({
      query: () => ({
        url: "parties",
        method: "GET",
      }),
      providesTags: ["Parties"],
    }),

    // Создание новой партии
    createParty: builder.mutation<void, Party>({
      query: (newParty: Party) => ({
        url: "parties",
        method: "POST",
        body: newParty,
      }),
      invalidatesTags: ["Parties"],
    }),

    // Присоединение к партии
    connectToParty: builder.mutation<void, ConnectToPartyRequest>({
      query: (request: ConnectToPartyRequest) => ({
        url: "parties/connect",
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Parties"],
    }),

    // Удаление конкретной партии
    deleteParty: builder.mutation<void, string>({
      query: (partyId: string) => ({
        url: `parties/${partyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Parties"],
    }),

    // Удаление всех партий
    deleteAllParties: builder.mutation<void, void>({
      query: () => ({
        url: "parties/delete-all",
        method: "DELETE",
      }),
      invalidatesTags: ["Parties"],
    }),
  }),
});

// Экспорт хуков для использования в компонентах
export const {
  useGetPartiesQuery,
  useCreatePartyMutation,
  useConnectToPartyMutation,
  useDeletePartyMutation,
  useDeleteAllPartiesMutation,
} = partyApi;