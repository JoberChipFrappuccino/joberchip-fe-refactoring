import { create } from 'zustand'

interface SpaceActiveState {
  activeBlockId: string

  setActiveBlockId: (id: string) => void
}

export const useActiveBlock = create<SpaceActiveState>((set) => {
  return {
    activeBlockId: '',
    setActiveBlockId: (id: string) => {
      set((state) => ({ ...state, activeBlockId: id }))
    }
  }
})
