import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Payment } from "../../../lib/types/payment";

const initialState: Payment = {
    creditCard: '',
    cvc: '',
    nameOfCard: '',
    fullName: '',
    deliveryInfo: '',
    monthExpireAt: '',
    yearExpireAt: '',
    email: ''
}

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentDetails: (state, action: PayloadAction<Payment>) => {
            const { creditCard, cvc, nameOfCard, fullName, deliveryInfo, monthExpireAt, yearExpireAt, email } = action.payload;
            state.creditCard = creditCard;
            state.cvc = cvc;
            state.nameOfCard = nameOfCard;
            state.fullName = fullName;
            state.deliveryInfo = deliveryInfo;
            state.monthExpireAt = monthExpireAt;
            state.yearExpireAt = yearExpireAt;
            state.email = email;
        },
        resetPaymentDetails: (state) => {
            state.creditCard = '';
            state.cvc = '';
            state.nameOfCard = '';
            state.fullName = '';
            state.deliveryInfo = '';
            state.monthExpireAt = '';
            state.yearExpireAt = '';
        }
    }
})

export const { setPaymentDetails, resetPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;