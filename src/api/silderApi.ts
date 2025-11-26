
import axiosClient from "./axiosClient";
const sliderApi = {
    getAllSliders: () => axiosClient.get("/sliders"),
    getById: (id: string) => axiosClient.get(`/sliders/${id}`),
    createSlider: (data: any) => axiosClient.post("/sliders", data),
    updateSlider: (id: string, data: any) => axiosClient.patch(`/sliders/${id}`, data),
    updateStatusSlider: (id: string, data: any) => axiosClient.patch(`/sliders/${id}/status`, data),
    updatePositionSlider: (id: string, data: any) => axiosClient.patch(`/sliders/${id}/order`, data),
    deleteSlider : (id: string) => axiosClient.delete(`/sliders/${id}`),
};
export default sliderApi;