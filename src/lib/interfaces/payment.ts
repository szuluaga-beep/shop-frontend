export interface PaymentWompi {
    creditCardNumber: string;
    monthExpiration:  string;
    yearExpiration:   string;
    cvc:              string;
    nameOnCard:       string;
    productId:        number;
    customerFullName: string;
    address:          string;
    customerEmail:    string;
    amountInCents:    number;
}

export interface PaymentResponse {
    id: string;
    status: string;
    amount: number;
    currency: string;
    transactionId: string;
    createdAt: string;
    updatedAt: string;
}