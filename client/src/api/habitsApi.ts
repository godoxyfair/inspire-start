import { api } from './api'
import {
  HabitsCreateRequestDTO,
  HabitsDTO,
  HabitsListResponseDTO,
} from './types'
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
    createHabit: builder.mutation<HabitsDTO, HabitsCreateRequestDTO>({
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
  useCreateHabitMutation,
  useDeleteHabitMutation,
} = habitsApi
