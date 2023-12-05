import { create } from 'zustand'

interface SharePageState {
  mode: SharePageMode
  setSharePageMode: (sharePageMode: SharePageMode) => void
}

export const useSharePageModeStore = create<SharePageState>((set) => {
  return {
    mode: 'VIEW',
    setSharePageMode: (spaceMode: SharePageMode) => {
      set({ mode: spaceMode })
    }
  }
})
