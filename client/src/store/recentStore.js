import { create } from "zustand";
import axios from "axios";

export const useRecentRequestsStore = create((set, get) => ({
  recentRequests: [],
  loading: false,
  error: null,

  fetchRecentRequests: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/requests/recent"); // 5 most recent
      if (res.data?.success && Array.isArray(res.data.data)) {
        set({ recent: res.data.data, loading: false });
      } else {
        set({ error: "Invalid response", loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addRecentRequest: (newRequest) => {
    set((state) => ({
      recentRequests: [newRequest, ...state.recentRequests.slice(0, 4)], // Keep latest 5
    }));
  },

  resetRequest: () => set({ recentRequests: [] }),
}));

export const useRecentActivitiesStore = create((set, get) => ({
  recentActivities: [],
  loading: false,
  error: null,

  fetchRecentActivities: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/activities/recent"); // 5 most recent
      if (res.data?.success && Array.isArray(res.data.data)) {
        set({ recentActivities: res.data.data, loading: false });
      } else {
        set({ error: "Invalid response", loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addActivityLog: (newLog) => {
    set((state) => ({
      recentActivities: [newLog, ...state.recentActivities.slice(0, 4)], // Keep latest 5
    }));
  },

  resetLogs: () => set({ recentActivities: [] }),
}));
