export const products = [
  // DRINK
  {
    id: 1,
    name: "Matcha Latte",
    price: 52000,
    category: "Drink",
    image: "/images/matcha-latte.png",
    description:
      "Matcha latte klasik dengan rasa lembut, creamy, dan autentik.",
  },
  {
    id: 2,
    name: "Osmanthus Matcha Latte",
    price: 55000,
    category: "Drink",
    image: "/images/osmanthus-matcha-latte.png",
    description:
      "Perpaduan matcha creamy dengan aroma bunga osmanthus yang lembut.",
  },
  {
    id: 3,
    name: "Ube Matcha Latte",
    price: 59000,
    category: "Drink",
    image: "/images/ube-matcha-latte.png",
    description:
      "Kombinasi unik matcha dan ube dengan rasa manis lembut dan warna cantik.",
  },
  {
    id: 4,
    name: "Berry Matcha Latte",
    price: 55000,
    category: "Drink",
    image: "/images/berry-matcha-latte.png",
    description:
      "Matcha latte segar dengan sentuhan berry yang manis dan sedikit asam.",
  },
  {
    id: 5,
    name: "Dirty Matcha",
    price: 56000,
    category: "Drink",
    image: "/images/dirty-matcha.png",
    description:
      "Espresso bertemu matcha untuk rasa bold, creamy, dan berlapis.",
  },
  {
    id: 6,
    name: "Coconut Matcha",
    price: 45000,
    category: "Drink",
    image: "/images/coconut-matcha.png",
    description:
      "Minuman matcha yang ringan dan tropis dengan sentuhan kelapa.",
  },
  {
    id: 7,
    name: "Corn Milk Matcha",
    price: 68000,
    category: "Drink",
    image: "/images/corn-milk-matcha.png",
    description:
      "Matcha creamy dengan rasa manis gurih jagung susu yang khas.",
  },
  {
    id: 8,
    name: "Sea Salt Matcha Latte",
    price: 70000,
    category: "Drink",
    image: "/images/sea-salt-matcha-latte.png",
    description:
      "Matcha latte premium dengan foam sea salt yang gurih dan creamy.",
  },
  {
    id: 9,
    name: "Usucha",
    price: 48000,
    category: "Drink",
    image: "/images/usucha.png",
    description:
      "Seduhan matcha tradisional yang ringan, murni, dan elegan.",
  },
  {
    id: 10,
    name: "Hojicha Latte",
    price: 50000,
    category: "Drink",
    image: "/images/hojicha-latte.png",
    description:
      "Latte hojicha dengan aroma roasted yang hangat dan menenangkan.",
  },

  // DESSERT
  {
    id: 11,
    name: "Original Salt Bread",
    price: 25000,
    category: "Dessert",
    image: "/images/original-salt-bread.png",
    description:
      "Roti lembut dengan rasa gurih asin yang sederhana namun nikmat.",
  },
  {
    id: 12,
    name: "Truffle Salt Bread",
    price: 35000,
    category: "Dessert",
    image: "/images/truffle-salt-bread.png",
    description:
      "Salt bread premium dengan aroma truffle yang harum dan mewah.",
  },
  {
    id: 13,
    name: "Burnt Matcha Cheese Cake",
    price: 72000,
    category: "Dessert",
    image: "/images/burnt-matcha-cheese-cake.png",
    description:
      "Cheesecake burnt creamy dengan cita rasa matcha yang kaya.",
  },
  {
    id: 14,
    name: "Burnt Cheese Cake",
    price: 62000,
    category: "Dessert",
    image: "/images/burnt-cheese-cake.png",
    description:
      "Cheesecake burnt lembut dengan rasa keju yang creamy dan legit.",
  },
  {
    id: 15,
    name: "Matcha Tiramisu",
    price: 80000,
    category: "Dessert",
    image: "/images/matcha-tiramisu.png",
    description:
      "Tiramisu lembut dengan sentuhan matcha yang elegan dan creamy.",
  },
  {
    id: 16,
    name: "Ube Tiramisu",
    price: 80000,
    category: "Dessert",
    image: "/images/ube-tiramisu.png",
    description:
      "Tiramisu manis lembut dengan rasa ube yang khas dan cantik.",
  },
  {
    id: 17,
    name: "Dubai Cheewy Cookie",
    price: 40000,
    category: "Dessert",
    image: "/images/dubai-cheewy-cookie.png",
    description:
      "Chewy cookie premium dengan tampilan mewah dan tekstur lembut.",
  },
  {
    id: 18,
    name: "Ube Cheewy Cookie",
    price: 42000,
    category: "Dessert",
    image: "/images/ube-cheewy-cookie.png",
    description:
      "Chewy cookie rasa ube dengan warna cantik dan rasa manis lembut.",
  },
];

export const formatRupiah = (value) =>
  `Rp ${value.toLocaleString("id-ID")}`;