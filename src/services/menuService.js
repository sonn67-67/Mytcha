
import api from "./api";

export const menuService = {
  getAll: async () => {
    const response = await api.get("/menu");

    console.log("Respons API menu:", response.data);

    // Mendukung API yang mengembalikan array langsung
    // maupun array dalam properti data
    const menus = Array.isArray(response.data)
      ? response.data
      : response.data?.data;

    if (!Array.isArray(menus)) {
      throw new Error(
        "Format data menu tidak sesuai. Periksa respons API."
      );
    }

    return menus.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
    }));
  },
};
