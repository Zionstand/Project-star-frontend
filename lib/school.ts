import api from "./api";

export const schoolService = {
  getSchool: async (id: string) => {
    const res = await api.get(`/schools/${id}`);
    return res.data;
  },

  getSchoolStaffs: async (id: string) => {
    const res = await api.get(`/schools/${id}/staffs`);
    return res.data;
  },

  getSchoolTeachers: async (id: string) => {
    const res = await api.get(`/schools/${id}/teachers`);
    return res.data;
  },

  getSchoolClasses: async (schoolID: string) => {
    const res = await api.get(`/classes/${schoolID}`);
    return res.data;
  },

  getSchoolSubjects: async (schoolID: string) => {
    const res = await api.get(`/subjects/${schoolID}`);
    return res.data;
  },
};
