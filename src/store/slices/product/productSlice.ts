import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../../lib/interfaces/product";

const initialState = {} as Product;

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            state.id = product.id;
            state.name = product.name;
            state.description = product.description;
            state.image = product.image;
            state.price = product.price;
            state.quantity = product.quantity;
        },
        removeProduct: (state) => {
            state.id = 0;
            state.name = '';
            state.description = '';
            state.image = '';
            state.price = 0;
            state.quantity = 0;
        }

    }
})

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;