import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    }
  }),
  tagTypes: ['Device', 'User', 'Energy'],
  endpoints: (builder) => ({
    register: builder.mutation<{ token: string; user: any }, { email: string; password: string; name?: string }>({
      query: (body) => ({ url: '/users/register', method: 'POST', body })
    }),
    login: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: (body) => ({ url: '/users/login', method: 'POST', body })
    }),
    getProfile: builder.query<any, void>({
      query: () => '/users/me',
      providesTags: ['User']
    }),

    getDevices: builder.query<any[], void>({
      query: () => '/devices',
      providesTags: (result) =>
        result ? [...result.map((d) => ({ type: 'Device' as const, id: d.id })), { type: 'Device' as const, id: 'LIST' }] : [{ type: 'Device' as const, id: 'LIST' }]
    }),
    createDevice: builder.mutation<any, Partial<any>>({
      query: (body) => ({ url: '/devices', method: 'POST', body }),
      invalidatesTags: [{ type: 'Device', id: 'LIST' }]
    }),
    updateDevice: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/devices/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, arg) => [{ type: 'Device', id: arg.id }]
    }),
    deleteDevice: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/devices/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'Device', id }, { type: 'Device', id: 'LIST' }]
    }),

    getEnergyDaily: builder.query<any, { deviceId: string }>({
      query: ({ deviceId }) => `/energy/daily/${deviceId}`,
      providesTags: ['Energy']
    }),

    getSuggestions: builder.query<any, void>({
      query: () => '/energy/suggestions'
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useGetDevicesQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useGetEnergyDailyQuery,
  useGetSuggestionsQuery
} = api