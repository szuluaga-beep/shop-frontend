import { faker } from "@faker-js/faker";

export const products = [
    {
        id: 1,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        quantity: faker.number.int({ min: 1, max: 100 }),
        image: "/vite.svg"
    },
    {
        id: 2,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        quantity: faker.number.int({ min: 1, max: 100 }),
        image: "/vite.svg"
    },
    {
        id: 3,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        quantity: faker.number.int({ min: 1, max: 100 }),
        image: "/vite.svg"
    }

]