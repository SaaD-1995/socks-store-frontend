import axiosClient from "./axiosClient";

interface RegisterBody {
  email: string;
  password: string;
  firstName?: string;
}

interface LoginResponse {
  access_token: string;
}

const authApi = {
  register: (data: RegisterBody) =>
    axiosClient.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    axiosClient.post<LoginResponse>("/auth/login", data)
      .then(res => res.data),

  getProfile: () =>
    axiosClient.get("/users/profile").then(res => res.data),
};

export default authApi;
