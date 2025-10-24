import api from "./api";

export const schoolService = {
  getSchool: async (id: string) => {
    const res = await api.get(`/schools/${id}`);
    return res.data;
  },
};
