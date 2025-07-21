import z from "zod";
import { cleanCardNumber } from "../utils";

// Regular expressions for common credit card types
export const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/; // 13 or 16 digits, starts with 4
export const mastercardRegex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/; // 16 digits, starts with 51-55 or 2221-2720

export const paymentSchema = z.object({
    creditCard: z.string()
        .trim() // Remove leading/trailing whitespace
        .transform(cleanCardNumber) // Remove internal spaces/dashes
        .refine(val => {
            // Check against multiple regexes
            return visaRegex.test(val) ||
                mastercardRegex.test(val)
        }, {
            message: 'Invalid credit card number format. Please enter a valid Visa or MasterCard number.'
        }),

    monthExpireAt: z.string().min(1, 'Month is required').refine(val => {
        const month = parseInt(val, 10);
        return month >= 1 && month <= 12;
    }, {
        message: 'Invalid month. Please select a valid month.'
    }),
    yearExpireAt: z.string().min(1, 'Year is required').refine(val => {
        const year = parseInt(val, 10);
        return year >= new Date().getFullYear();
    }, {
        message: 'Invalid year. Please select a valid year.'
    }).transform(val => val.toString().slice(-2)), // Ensure only last two digits
    cvc: z.string()
        .length(3, 'CVC must be exactly 3 digits'),
    nameOfCard: z.string().min(1, 'Name on card is required'),
    fullName: z.string().min(1, 'Customer full name is required'),
    email: z.email('Invalid email format'),
    deliveryInfo: z.string().min(1, 'Delivery information is required'),
});