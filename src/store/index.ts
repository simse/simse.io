import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreState {
  selectedWallpaperId: string;
  setSelectedWallpaperId: (id: string) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedWallpaperId: "default",
      setSelectedWallpaperId: (id: string) => set({ selectedWallpaperId: id }),
    }),
    {
      name: "simon-os-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
