import api from "./api";

export const parentService = {
  getMyChildren: async (parentId: string) => {
    const res = await api.get(`/parents/children/${parentId}`);
    return res.data;
  },

  getChildDetails: async (parentId: string, childId: string) => {
    const res = await api.get(`/parents/children/${parentId}/${childId}`);
    return res.data;
  },

  getChildAssignments: async (parentId: string, childId: string) => {
    const res = await api.get(
      `/parents/children/${parentId}/${childId}/assignments`
    );
    return res.data;
  },
};
