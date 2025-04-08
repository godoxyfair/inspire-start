import { api } from './api';
import { AuthRequestDto } from './types';

const signUrl = '/signin';

export const signApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<{ status: 'authorised' }, AuthRequestDto>({
            query: ({ login, password }) => ({
                url: `${signUrl}`,
                method: 'POST',
                body: {
                    login,
                    password,
                },
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('status', data.status);
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const { useSignInMutation } = signApi;
