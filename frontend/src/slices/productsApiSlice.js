import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL, // Correct API URL to fetch products
            }),
            keepUnusedDataFor: 5, // Cache timeout of 5 seconds
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url:`${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation({
            query: () => ({
                url:PRODUCTS_URL,
                method:'POST',
            }),
            invalidatesTags:['Product']
        }),
    }),
    
});

export const { useGetProductsQuery , useCreateProductMutation, useGetProductDetailsQuery} = productsApiSlice;
