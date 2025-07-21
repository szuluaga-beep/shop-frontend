import type { PaymentResponse, PaymentWompi } from "../lib/interfaces/payment";
import { sleep } from "../lib/utils";


export const createPayment = async (paymentData: PaymentWompi) => {
    sleep(3000)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
        throw new Error('Failed to process payment');
    }

    const data: PaymentResponse = await response.json();
    return data;
}