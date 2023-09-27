import { getSpaceAPI, getSpaceFromBackAPI } from '@/api/space'
import { type Space } from '@/models/space'
import { create } from 'zustand'

interface Privilege {
  edit: boolean
  delete: boolean
}
interface SpaceState {
  space: Space // ? Partial<Space> | Space  할까요? Space 할까요?
  isFetching: boolean
  isLoaded: boolean
  isFalture: boolean
  mode: SpaceMode
  setSpaceMode: (spaceMode: SpaceMode) => void
  loadSpace: (pageId: string) => Promise<boolean>
  loadSpaceFromBack: (pageId: string) => Promise<boolean>
  // loadSpacePrivligeByUserId: (userId: string) => Promise<Privilege>
  addBlock: (section_id: string, options: object) => Promise<boolean>
  removeBlock: (section_id: string, block_id: string) => Promise<boolean>
  setPrivilege: (previlige: Privilege) => void
  removeBlockById: (blockId: string) => void
  setSpace: (space: Space) => void
}

export const useSpaceStore = create<SpaceState>((set) => {
  return {
    // ? 이거 속성 다 뺄 수 없나..? Partial<Space> | Space 이렇게 되면 좋게싸..
    space: {
      spaceId: '',
      profileImage: '/profile_3.png', // * default image 넣어야함
      layout: {
        styles: {}
      },
      title: '',
      description: '',
      previlige: {
        edit: false,
        delete: false
      },
      blocks: []
    },
    mode: 'view',
    isFetching: true,
    isLoaded: false,
    isFalture: false,
    setSpaceMode: (spaceMode: SpaceMode) => {
      set({ mode: spaceMode })
    },
    loadSpace: async (pageId: string) => {
      set(() => ({ isFetching: true, isLoaded: false, isFalture: false }))
      const { data } = await getSpaceAPI(pageId)
      if (data) {
        set(() => ({ space: data, isFetching: false, isLoaded: true, isFalture: false }))
        return true
      }
      set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
      return false
    },
    loadSpaceFromBack: async (pageId: string) => {
      set(() => ({ isFetching: true, isLoaded: false, isFalture: false }))
      const { data } = await getSpaceFromBackAPI(pageId)
      if (data) {
        set(() => ({ space: data, isFetching: false, isLoaded: true, isFalture: false }))
        return true
      }
      set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
      return false
    },
    setSpace: (space: Space) => {
      set(() => ({ space, isLoaded: true, isFalture: false }))
    },
    setPrivilege: (privilege: Privilege) => {
      set((state) => ({ ...state, space: { ...state.space, previlige: privilege } }))
    },
    removeBlockById: async (blockId: string) => {
      set((state) => {
        for (let i = 0; i < state.space.blocks.length; i++) {
          if (state.space.blocks[i].blockId === blockId) {
            state.space.blocks.splice(i, 1)
            // todo : block 삭제 API를 호출해야 합니다.
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
