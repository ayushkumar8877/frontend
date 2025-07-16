import { create } from "zustand";

const useUnseenStore = create((set) => ({
  unseenMap: {},
  setUnseen: (userId, status) =>
    set((state) => ({ unseenMap: { ...state.unseenMap, [userId]: status } })),
  clearUnseen: (userId) =>
    set((state) => {
      const updated = { ...state.unseenMap };
      delete updated[userId];
      return { unseenMap: updated };
    }),
}));

export default useUnseenStore;