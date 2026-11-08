
import api from "./api";

export const orderService = {
  create: async (payload) => {
    const response = await api.post("/orders", payload);
    return response.data.data;
  },

  getById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data;
  },
};
