import api from "./api";

export const teacherService = {
  getTeacherClasses: async (schoolId: string, teacherId: string) => {
    const res = await api.get(`/teachers/${teacherId}/${schoolId}/classes`);
    return res.data;
  },

  getTeacherSubjects: async (schoolId: string, teacherId: string) => {
    const res = await api.get(`/teachers/${teacherId}/${schoolId}/subjects`);
    return res.data;
  },

  getStudentInClass: async (
    schoolId: string,
    teacherId: string,
    classId: string
  ) => {
    const res = await api.get(
      `/teachers/${teacherId}/${schoolId}/${classId}/students`
    );
    return res.data;
  },

  getTSubjects: async (schoolId: string, teacherId: string) => {
    const res = await api.get(`/teachers/${teacherId}/${schoolId}/subjects`);
    return res.data;
  },
};
