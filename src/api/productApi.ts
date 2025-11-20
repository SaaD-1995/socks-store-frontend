import axiosClient from "./axiosClient";
const productApi = {
  getAllProducts: (page = 1, limit = 10) => axiosClient.get(`/products?page=${page}&limit=${limit}`),
  getById: (id: string) => axiosClient.get(`/products/${id}`),
  createProduct: (data: any) => axiosClient.post("/products", data),
  updateProduct: (id: string, data: any) => axiosClient.patch(`/products/${id}`, data),
  deleteProduct : (id: string) => axiosClient.delete(`/products/${id}`),
  searchProducts: (query: string) => axiosClient.get(`/products?search?=${query}`),
  totalProducts: () => axiosClient.get("/products/stats/total"),
};

export default productApi;