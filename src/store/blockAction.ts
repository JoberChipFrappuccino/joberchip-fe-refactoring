import { create } from 'zustand'
import { BLOCK, LINK } from '@/constants/block'
import { type BlockType } from '@/models/block'

interface FormTypeState {
  formType: FormType
  blockType: BlockType
  openDrawer: boolean
  drawerMode: DrawerMode
  activeBlockId: string
  setActiveBlockId: (id: string) => void
  setFormType: (type: FormType) => void
  setBlockType: (type: BlockType) => void
  setOpenDrawer: (open: boolean) => void
  setDrawerMode: (mode: DrawerMode) => void
}

export const useBlockActionStore = create<FormTypeState>((set) => ({
  formType: BLOCK,
  blockType: LINK,
  openDrawer: false,
  drawerMode: 'CREATE',
  activeBlockId: '',
  setActiveBlockId: (id: string) => {
    set((state) => ({ ...state, activeBlockId: id }))
  },
  setFormType: (formType) => {
    set({ formType })
  },
  setBlockType: (blockType) => {
    set({ blockType })
  },
  setOpenDrawer: (open: boolean) => {
    set({ openDrawer: open })
  },
  setDrawerMode: (mode) => {
    set({ drawerMode: mode })
  }
}))
