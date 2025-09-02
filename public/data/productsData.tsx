interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
}

const productsData: Product[] = [
    {
        id: 1,
        name: "Doxiva",
        price: 29.99,
        image: "https://i.chaldn.com/_mpimage/doxiva-tablet-400mg-10-tablets?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D106482&q=low&v=1&m=400",
        inStock: true,
    },
    {
        id: 2,
        name: "Napa extend",
        price: 39.99,
        image: "https://i.chaldn.com/_mpimage/napa-extend-tablet-665mg-12-tablets?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D106090&q=low&v=1",
        inStock: false,
    },
    {
        id: 3,
        name: "Angilock",
        price: 49.99,
        image: "https://i.chaldn.com/_mpimage/angilock-tablet-50mg-10-tablets?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D105378&q=low&v=1&m=400",
        inStock: true,
    },
];

export default productsData;
