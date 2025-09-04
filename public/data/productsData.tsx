interface Product {
  id: number;
  name: string;
  description?: string;
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
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
