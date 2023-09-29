import { getSpaceAPI, getSpaceFromBackAPI } from '@/api/space'
import { type SharePage } from '@/models/space'
import { create } from 'zustand'

interface Privilege {
  edit: boolean
  delete: boolean
}
interface SharePageState {
  sharePage: SharePage // ? Partial<Space> | Space  할까요? Space 할까요?
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
  setSpace: (space: SharePage) => void
}

export const useSharePageStore = create<SharePageState>((set) => {
  return {
    // ? 이거 속성 다 뺄 수 없나..? Partial<Space> | Space 이렇게 되면 좋게싸..
    sharePage: {
      pageId: '',
      pageProfileImage: '/profile_3.png', // * default image 넣어야함
      layout: {
        styles: {}
      },
      title: '',
      description: '',
      previlige: {
        edit: false,
        delete: false
      },
      children: []
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
        // HACK : width -> w로 변경 예정입니다. 이 코드는 10/6 이전에 삭제됩니다.
        data.children.forEach((block) => {
          block.w = Number(block.width)
          block.h = Number(block.height)
        })

        set(() => ({ sharePage: data, isFetching: false, isLoaded: true, isFalture: false }))
        return true
      }
      set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
      return false
    },
    loadSpaceFromBack: async (pageId: string) => {
      set(() => ({ isFetching: true, isLoaded: false, isFalture: false }))
      const { data } = await getSpaceFromBackAPI(pageId)
      if (data) {
        // HACK : width -> w로 변경 예정입니다. 이 코드는 10/6 이전에 삭제됩니다.
        data.children.forEach((block) => {
          block.w = Number(block.width)
          block.h = Number(block.height)
        })

        set(() => ({ sharePage: data, isFetching: false, isLoaded: true, isFalture: false }))
        return true
      }
      set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
      return false
    },
    setSpace: (space: SharePage) => {
      set(() => ({ sharePage: space, isLoaded: true, isFalture: false }))
    },
    setPrivilege: (privilege: Privilege) => {
      set((state) => ({ ...state, sharePage: { ...state.sharePage, previlige: privilege } }))
    },
    removeBlockById: async (blockId: string) => {
      set((state) => {
        for (let i = 0; i < state.sharePage.children.length; i++) {
          if (state.sharePage.children[i].objectId === blockId) {
            state.sharePage.children.splice(i, 1)
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
