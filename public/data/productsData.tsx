interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  sellingPrice?: number;
  stockQty: number;
  image: string;
  inStock: boolean;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Doxiva",
    sku: "DOX400",
    category: "Tablet",
    price: 29.99,
    stockQty: 100,
    image:
      "https://i.chaldn.com/_mpimage/doxiva-tablet-400mg-10-tablets?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D106482&q=low&v=1&m=400",
    inStock: true,
  },
  {
    id: 2,
    name: "Napa extend",
    sku: "NAP665",
    category: "Tablet",
    price: 39.99,
    stockQty: 50,
    image:
      "https://i.chaldn.com/_mpimage/napa-extend-tablet-665mg-12-tablets?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D106090&q=low&v=1",
    inStock: false,
  },
  {
    id: 3,
    name: "Angilock",
    sku: "ANG50",
    category: "Tablet",
    price: 49.99,
    stockQty: 75,
    image:
      "https://i.chaldn.com/_mpimage/angilock-tablet-50mg-10-tablets?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D105378&q=low&v=1&m=400",
    inStock: true,
  },
];

export default productsData;
