import axiosClient from "./axiosClient";
const productApi = {
  getAllProducts: () => axiosClient.get("/products"),
  getById: (id: string) => axiosClient.get(`/products/${id}`),
  createProduct: (data: any) => axiosClient.post("/products", data),
  updateProduct: (id: string, data: any) => axiosClient.patch(`/products/${id}`, data),
  deleteProduct : (id: string) => axiosClient.delete(`/products/${id}`),
};

export default productApi;