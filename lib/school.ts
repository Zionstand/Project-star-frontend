import api from "./api";

export const schoolService = {
  getSchool: async (schoolID: string) => {
    const res = await api.get(`/schools/${schoolID}`);
    return res.data;
  },

  getSchoolStaffs: async (schoolID: string) => {
    const res = await api.get(`/schools/${schoolID}/staffs`);
    return res.data;
  },

  getSchoolUsers: async (schoolID: string) => {
    const res = await api.get(`/schools/${schoolID}/users`);
    return res.data;
  },

  getSchoolStaff: async (schoolID: string, staffID: string | string[]) => {
    const res = await api.get(`/schools/${schoolID}/staffs/${staffID}`);
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

  getSchoolClassDetails: async (
    schoolID: string,
    classID: string | string[]
  ) => {
    const res = await api.get(`/classes/${schoolID}/${classID}`);
    return res.data;
  },

  getTeacherAssignments: async (schoolID: string) => {
    const res = await api.get(`/schools/${schoolID}/assign-teachers`);
    return res.data;
  },

  getUserSchema: async (modelName: string) => {
    const res = await api.get(`/schema/${modelName}`);
    return res.data;
  },
};
