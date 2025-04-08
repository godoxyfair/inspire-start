import { api } from './api'
import { HabitsDTO, HabitsListResponseDTO } from './types'
const habitsUrl = '/habits'

export const habitsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query<
      HabitsListResponseDTO,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `${habitsUrl}`,
        params: { page, limit },
      }),
      providesTags: (result, error) =>
        error ? [] : [{ type: 'HabitsList' }, 'HabitsList'],
    }),
    changeHabit: builder.mutation<HabitsDTO, { title: string }>({
      query: (data) => ({
        url: `${habitsUrl}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteHabit: builder.mutation<HabitsDTO, { id: string }>({
      query: ({ id }) => ({
        url: `${habitsUrl}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HabitsList'],
    }),
  }),

  overrideExisting: false,
})

export const {
  useGetHabitsQuery,
  useChangeHabitMutation,
  useDeleteHabitMutation,
} = habitsApi
