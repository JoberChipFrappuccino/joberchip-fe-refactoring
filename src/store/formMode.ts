import { type BlockType } from '@/models/space'
import { create } from 'zustand'

export type FormType = 'template' | 'page' | 'block' | undefined
interface FormTypeState {
  formType: FormType
  blockType: BlockType
  openDrawer: boolean
  mode: 'create' | 'edit'
  setFormType: (type: FormType) => void
  setBlockType: (type: BlockType) => void
  setOpenDrawer: (open: boolean) => void
  setMode: (mode: 'create' | 'edit') => void
}

export const useDrawerFormType = create<FormTypeState>((set) => ({
  formType: undefined,
  blockType: 'text',
  openDrawer: false,
  mode: 'create',
  setFormType: (formType) => {
    set({ formType })
  },
  setBlockType: (blockType) => {
    set({ blockType })
  },
  setOpenDrawer: (open: boolean) => {
    set({ openDrawer: open })
  },
  setMode: (mode) => {
    set({ mode })
  }
}))
