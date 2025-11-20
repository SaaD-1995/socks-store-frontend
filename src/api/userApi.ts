import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => axiosClient.get("/users"),
  getById: (id: string) => axiosClient.get(`/users/${id}`),
  getByProfile: () => axiosClient.get("/users/profile"),
};

export default userApi;
