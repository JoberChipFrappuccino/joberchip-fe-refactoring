import { create } from 'zustand'
import { BLOCK, TEXT } from '@/constants/blockTypeConstant'
import { type BlockType } from '@/models/space'

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

export const useBlockAction = create<FormTypeState>((set) => ({
  formType: BLOCK,
  blockType: TEXT,
  openDrawer: false,
  drawerMode: 'create',
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
