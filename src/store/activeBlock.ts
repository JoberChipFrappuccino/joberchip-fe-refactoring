import { create } from 'zustand'

interface SpaceActiveState {
  activeBlockId: string
  activeBlockPositionTop: number
  activeBlockPositionRight: number
  setActiveBlockId: (id: string) => void
  setActiveBlockPosition: (top: number, right: number) => void
}

export const useActiveBlock = create<SpaceActiveState>((set) => {
  return {
    activeBlockId: '',
    activeBlockPositionTop: 0,
    activeBlockPositionRight: 0,
    setActiveBlockId: (id: string) => {
      set((state) => ({ ...state, activeBlockId: id }))
    },
    setActiveBlockPosition: (top: number, right: number) => {
      set((state) => ({ ...state, activeBlockPositionTop: top, activeBlockPositionRight: right }))
    }
  }
})
