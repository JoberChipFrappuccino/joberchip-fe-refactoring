import { create } from 'zustand'

interface SpaceModeState {
  mode: SpaceMode
  setSpaceMode: (spaceMode: SpaceMode) => void
}

export const useSpaceModeStore = create<SpaceModeState>((set) => ({
  mode: 'view',
  setSpaceMode: (spaceMode: SpaceMode) => set({ mode: spaceMode })
}))
