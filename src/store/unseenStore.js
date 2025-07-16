// useUnseenStore.js
import { create } from "zustand";

const STORAGE_KEY = "unseenMap";

// helper to load from localStorage on start
const getInitialMap = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const useUnseenStore = create((set) => ({
  unseenMap: getInitialMap(),

  setUnseen: (userId, status) =>
    set((state) => {
      const updated = { ...state.unseenMap, [userId]: status };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { unseenMap: updated };
    }),

  clearUnseen: (userId) =>
    set((state) => {
      const updated = { ...state.unseenMap };
      delete updated[userId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { unseenMap: updated };
    }),
}));

export default useUnseenStore;
