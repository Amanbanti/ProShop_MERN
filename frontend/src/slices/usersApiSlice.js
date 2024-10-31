import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url:  `${USERS_URL}/login`, 
                method :'POST',
                body:data,
            }),
        
        }),

        register: builder.mutation({
            query: (data) => ({
                url:  `${USERS_URL}`, 
                method :'POST',
                body:data,
            }),
        
        }),


        logout: builder.mutation({
            query: () => ({
                url:  `${USERS_URL}/logout`, 
                method :'POST',
                
            }),
        
        }),

        profile: builder.mutation({
            query:(data) => ({
                url:  `${USERS_URL}/profile`, 
                method :'PUT',
                body: data,
            }),
        
        }),


        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags:['Users'],
            keepUnusedDataFor: 5, // Cache timeout of 5 seconds
          
        }),


        deleteUser: builder.mutation({
            query: (userId) => ({
                url:  `${USERS_URL}/${userId}`,
                method: 'DELETE'
            }),
          
          
        }),

        
      
    
    }),
});

export const { 
    useLoginMutation,
    useProfileMutation, 
    useLogoutMutation, 
    useRegisterMutation,
    useGetUsersQuery,
    useDeleteUserMutation
} = usersApiSlice;
