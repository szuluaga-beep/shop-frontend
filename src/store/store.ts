import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./slices/payment/paymentSlice";
import productReducer from "./slices/product/productSlice";
import summaryReducer from "./slices/summary/summarySlice";


export const store = configureStore({
    reducer: {
        payment: paymentReducer,
        product: productReducer,
        summary: summaryReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;