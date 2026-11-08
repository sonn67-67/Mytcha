
import api from "./api";

export const menuService = {
  getAll: async () => {
    const response = await api.get("/menu");

    return response.data.data.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
    }));
  },
};
