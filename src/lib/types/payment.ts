import type z from "zod";
import type { paymentSchema } from "../schemas/payment";


export type Payment = z.infer<typeof paymentSchema>;