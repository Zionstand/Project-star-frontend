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

  getTeacherAssignmentsDocuments: async (
    schoolId: string,
    teacherId: string
  ) => {
    const res = await api.get(
      `/assignments/${teacherId}/${schoolId}/all-assignment-documents`
    );

    console.log(res);
    return res.data;
  },

  getTeacherAssignments: async (schoolId: string, teacherId: string) => {
    const res = await api.get(
      `/assignments/${teacherId}/${schoolId}/assignments`
    );
    return res.data;
  },

  getTeacherLessonNotes: async (schoolId: string, teacherId: string) => {
    const res = await api.get(
      `/assignments/${teacherId}/${schoolId}/lesson-notes`
    );
    return res.data;
  },

  getTeacherAssignmentsDetails: async (
    schoolId: string,
    teacherId: string,
    assignmentId: string | string[]
  ) => {
    const res = await api.get(
      `/assignments/teachers/${teacherId}/${schoolId}/assignments/${assignmentId}`
    );
    return res.data;
  },
};
