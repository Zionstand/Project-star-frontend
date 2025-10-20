// services/schoolService.ts
import { fetchData, postData, updateData } from "@/lib/api";

export async function getSchool(schoolId: string) {
  return fetchData(`/schools/${schoolId}`);
}

// export async function updateSchool(schoolId: string, data: any) {
//   return updateData(`/schools/${schoolId}`, data);
// }

// // services/studentService.ts
// export async function getStudents(schoolId: string) {
//   return fetchData(`/schools/${schoolId}/students`);
// }

// export async function createStudent(schoolId: string, data: any) {
//   return postData(`/schools/${schoolId}/students`, data);
// }

// export async function updateStudent(studentId: string, data: any) {
//   return updateData(`/students/${studentId}`, data);
// }

// export async function deleteStudent(studentId: string) {
//   return api.delete(`/students/${studentId}`);
// }

// // services/teacherService.ts
// export async function getTeachers(schoolId: string) {
//   return fetchData(`/schools/${schoolId}/teachers`);
// }

// export async function createTeacher(schoolId: string, data: any) {
//   return postData(`/schools/${schoolId}/teachers`, data);
// }
