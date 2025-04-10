import { authSliceActions, User } from '@/redux/authSlice'
import { api } from './api'
import { AuthRequestDto } from './types'

const signUrl = 'http://localhost:3001/auth/google'

export const signApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<User, void>({
      query: () => ({
        url: 'auth/userInfo',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    logOut: builder.mutation<any, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(body, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
        } finally {
          dispatch(authSliceActions.logoutUser())
          localStorage.removeItem('isAuth')
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useLogOutMutation, useFetchUserQuery } = signApi
