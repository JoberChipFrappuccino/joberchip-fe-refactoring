import { type BlockType } from '@/models/space'
import { create } from 'zustand'

export type FormType = 'template' | 'page' | 'block' | undefined
export type DrawerMode = 'create' | 'edit'
interface FormTypeState {
  formType: FormType
  blockType: BlockType
  openDrawer: boolean
  drawerMode: DrawerMode
  setFormType: (type: FormType) => void
  setBlockType: (type: BlockType) => void
  setOpenDrawer: (open: boolean) => void
  setDrawerMode: (mode: 'create' | 'edit') => void
}

export const useDrawerFormType = create<FormTypeState>((set) => ({
  formType: undefined,
  blockType: 'text',
  openDrawer: false,
  drawerMode: 'create',
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
