
import api from "./api";

export const orderService = {
  create: async (payload) => {
    try {
      console.log("URL API:", api.defaults.baseURL);
      console.log("Data pesanan:", payload);

      const response = await api.post("/orders", payload);

      console.log("Respons pesanan:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Gagal membuat pesanan:", {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        status: error.response?.status,
        response: error.response?.data,
        message: error.message,
      });

      throw error;
    }
  },

  getById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data;
  },
};

