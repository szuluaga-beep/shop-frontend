import type { Product } from "../lib/interfaces/product";
import { sleep } from "../lib/utils";


export const getProducts = async () => {
    sleep(3000)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data: Product[] = await response.json();
    return data;
}