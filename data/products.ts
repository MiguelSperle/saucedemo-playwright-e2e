type Product = {
    id: number;
    name: string;
};

type ProductKey = 'BACKPACK_PRODUCT' | 'BIKE_LIGHT_PRODUCT';

export const products = {
    BACKPACK_PRODUCT: {
        id: 4,
        name: 'Sauce Labs Backpack',
    },
    BIKE_LIGHT_PRODUCT: {
        id: 0,
        name: 'Sauce Labs Bike Light',
    }
} satisfies Record<ProductKey, Product>;

