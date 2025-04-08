import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['HabitsList'],
  baseQuery: async (args, api, extraOptions) => {
    const token = localStorage.getItem('token')

    const result = await fetchBaseQuery({
      credentials: 'include',
      mode: 'cors',
      baseUrl: 'http://localhost:3001/',
      prepareHeaders: (headers) => {
        // headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        headers.set('Content-type', 'application/json')
        return headers
      },
    })(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      //TODO:refrechTokenApi
    }

    return result
  },
  endpoints: () => ({}),
})
