type ProductInformation = {
    id: number;
    name: string;
};

type Products = {
    BACKPACK_PRODUCT: ProductInformation;
    BIKE_LIGHT_PRODUCT: ProductInformation;
};

export const products: Products = {
    BACKPACK_PRODUCT: {
        id: 4,
        name: 'Sauce Labs Backpack',
    },
    BIKE_LIGHT_PRODUCT: {
        id: 0,
        name: 'Sauce Labs Bike Light',
    }
};

