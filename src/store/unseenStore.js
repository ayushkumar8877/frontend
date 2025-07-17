import { create } from "zustand";

const STORAGE_KEY = "unseenMap";

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

  setUnseen: (userId, count) =>
    set((state) => {
      const updated = { ...state.unseenMap, [userId]: count };
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

  incrementUnseen: (userId) =>
    set((state) => {
      const current = state.unseenMap[userId] || 0;
      const updated = { ...state.unseenMap, [userId]: current + 1 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { unseenMap: updated };
    }),

  // ✅ Resets unseen count to 0 instead of removing the key
  resetUnseen: (userId) =>
    set((state) => {
      const updated = { ...state.unseenMap, [userId]: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { unseenMap: updated };
    }),

  // ✅ Optional: fully reset all unseen messages
  resetAll: () =>
    set(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
      return { unseenMap: {} };
    }),
}));

export default useUnseenStore;
