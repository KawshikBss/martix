interface Category {
  name: string;
  slug?: string;
  children?: Category[];
  image?: string;
}

const categoriesData: Category[] = [
  {
    name: "Electronics",
    slug: "electronics",
    children: [
      {
        name: "Mobile Phones",
        slug: "mobile-phones",
        children: [],
        image:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Laptops",
        slug: "laptops",
        children: [],
        image:
          "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1683120974913-1ef17fdec2a8?q=80&w=963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fashion",
    slug: "fashion",
    children: [
      {
        name: "Men's Clothing",
        slug: "mens-clothing",
        children: [],
        image:
          "https://plus.unsplash.com/premium_photo-1695575576052-7c271876b075?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Women's Clothing",
        slug: "womens-clothing",
        children: [],
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    image:
      "https://plus.unsplash.com/premium_vector-1705526270279-0a529cfb31ab?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Home & Garden",
    slug: "home-garden",
    children: [
      {
        name: "Furniture",
        slug: "furniture",
        children: [],
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Kitchen",
        slug: "kitchen",
        children: [],
        image:
          "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default categoriesData;
