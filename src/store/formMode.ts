import { BlockType } from '@/models/space'
import { create } from 'zustand'

export type FormType = 'template' | 'page' | 'block' | undefined
interface FormTypeState {
  formType: FormType
  blockType: BlockType
  openDrawer: boolean
  setFormType: (mode: FormType) => void
  setBlockType: (type: BlockType) => void
  setOpenDrawer: (open: boolean) => void
}

export const useDrawerFormType = create<FormTypeState>((set) => ({
  formType: undefined,
  blockType: 'text',
  openDrawer: false,
  setFormType: (mode) => set({ formType: mode }),
  setBlockType: (type) => set({ blockType: type }),
  setOpenDrawer: (open: boolean) => set({ openDrawer: open })
}))
