import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
    creditCard: string;
    cvc: string;
    nameOfCard: string;
    fullName: string;
    deliveryInfo: string;
    monthExpireAt: string;
    yearExpireAt: string;
}

const initialState: PaymentState = {
    creditCard: '',
    cvc: '',
    nameOfCard: '',
    fullName: '',
    deliveryInfo: '',
    monthExpireAt: '',
    yearExpireAt: ''
}

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentDetails: (state, action: PayloadAction<PaymentState>) => {
            const { creditCard, cvc, nameOfCard, fullName, deliveryInfo, monthExpireAt, yearExpireAt } = action.payload;
            state.creditCard = creditCard;
            state.cvc = cvc;
            state.nameOfCard = nameOfCard;
            state.fullName = fullName;
            state.deliveryInfo = deliveryInfo;
            state.monthExpireAt = monthExpireAt;
            state.yearExpireAt = yearExpireAt;
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