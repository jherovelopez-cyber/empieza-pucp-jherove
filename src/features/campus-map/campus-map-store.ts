import { create } from "zustand";

type CampusMapState = {
  selectedPlaceId?: string;
  filter: string;
  setSelectedPlaceId: (id: string) => void;
  setFilter: (filter: string) => void;
};

export const useCampusMapStore = create<CampusMapState>((set) => ({
  filter: "Servicios",
  setSelectedPlaceId: (selectedPlaceId) => set({ selectedPlaceId }),
  setFilter: (filter) => set({ filter })
}));
