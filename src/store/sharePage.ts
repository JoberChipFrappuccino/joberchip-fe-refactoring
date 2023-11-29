import { create } from 'zustand'
import { getSpaceAPI, getSpaceFromBackAPI } from '@/apis/space'
import { type SharePage } from '@/models/space'
import { to } from '@/utils/api'

interface SharePageState {
  sharePage: SharePage
  isFetching: boolean
  isLoaded: boolean
  isFalture: boolean
  mode: SharePageMode
  setSharePageMode: (sharePageMode: SharePageMode) => void
  loadSharePage: (pageId: string) => Promise<boolean>
  loadSharePageFromBack: (pageId: string) => Promise<boolean>
  addBlock: (section_id: string, options: object) => Promise<boolean>
  removeBlock: (section_id: string, block_id: string) => Promise<boolean>
  removeBlockById: (blockId: string) => void
  setSharePage: (space: SharePage) => void
}

export const useSharePageStore = create<SharePageState>((set) => {
  return {
    spaceId: '',
    sharePage: {
      pageId: '',
      profileImageLink: '/profile_1.png', // * default image 넣어야함
      layout: {
        styles: {}
      },
      title: '',
      description: '',
      privilege: null,
      children: []
    },
    mode: 'view',
    isFetching: true,
    isLoaded: false,
    isFalture: false,
    setSharePageMode: (spaceMode: SharePageMode) => {
      set({ mode: spaceMode })
    },
    loadSharePage: async (pageId: string) => {
      set(() => ({ isFetching: true, isLoaded: false, isFalture: false }))
      const { data } = await to(getSpaceAPI(pageId))
      if (data) {
        set(() => ({ sharePage: data, isFetching: false, isLoaded: true, isFalture: false }))
        return true
      }
      set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
      return false
    },
    loadSharePageFromBack: async (pageId: string) => {
      set(() => ({ isFetching: true, isLoaded: true, isFalture: false }))
      const { data } = await to(getSpaceFromBackAPI(pageId))
      if (data) {
        // HACK : x,y,h,w,가 없을 경우를 대비해서 필터링
        data.children = data.children.filter((item) => {
          if (
            typeof item.x !== 'number' ||
            typeof item.y !== 'number' ||
            typeof item.h !== 'number' ||
            typeof item.w !== 'number'
          ) {
            return false
          }
          return true
        })
        set(() => ({ sharePage: { ...data, pageId }, isFetching: false, isLoaded: true, isFalture: false }))
        return true
      }
      set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
      return false
    },
    setSharePage: (space: SharePage) => {
      set(() => ({ sharePage: space, isLoaded: true, isFalture: false }))
    },
    removeBlockById: async (blockId: string) => {
      set((state) => {
        for (let i = 0; i < state.sharePage.children.length; i++) {
          if (state.sharePage.children[i].objectId === blockId) {
            state.sharePage.children.splice(i, 1)
            break
          }
        }
        return { ...state }
      })
    },
    // loadSpacePrivligeById: async (userId: string, spaceId: string) => {
    //   return { edit: true, delete: true }
    // },
    // ! 미구현 ㅎㅅㅎ
    addBlock: async (sectionId: string, options: object) => {
      return true
    },
    removeBlock: async (sectionId: string, blockId: string) => {
      return true
    }
  }
})
