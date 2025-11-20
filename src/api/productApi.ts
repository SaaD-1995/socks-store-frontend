import axiosClient from "./axiosClient";
const productApi = {
  getAllProducts: () => axiosClient.get("/products"),
  getById: (id: string) => axiosClient.get(`/products/${id}`),
  createProduct: (data: any) => axiosClient.post("/products", data),
  update: (id: string, data: any) => axiosClient.put(`/products/${id}`, data),
  delete: (id: string) => axiosClient.delete(`/products/${id}`),
};

export default productApi;