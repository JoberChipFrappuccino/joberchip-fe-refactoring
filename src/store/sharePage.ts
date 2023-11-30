import { create } from 'zustand'
// import { getSpaceMockAPI, getSpaceFromBackAPI } from '@/apis/space'
// import { type SharePage } from '@/models/space'
// import { to } from '@/utils/api'

interface SharePageState {
  // sharePage: SharePage
  // isFetching: boolean
  // isLoaded: boolean
  // isFalture: boolean
  mode: SharePageMode
  setSharePageMode: (sharePageMode: SharePageMode) => void
  // loadSharePage: (pageId: string) => Promise<boolean>
  // loadSharePageFromBack: (pageId?: string) => Promise<boolean>
  // addBlock: (section_id: string, options: object) => Promise<boolean>
  // removeBlock: (section_id: string, block_id: string) => Promise<boolean>
  // removeBlockById: (blockId: string) => void
  // setSharePage: (space: SharePage) => void
}

// 1. SharePage를 React-query로 관리할 경우
// mode만 Zustand로 관리하고 나머지는 React-query로 관리
// 이 경우 레이아웃이 업데이트 될 때 Optimistic하게 처리해야함

// 2. SharePage를 Zustand로 관리할 경우
// SSR로 받아온 데이터를 Zustand에 저장하고 이후 Zustand를 통해 관리
// 이 경우 SSR, CSR간의 데이터 불일치가 발생할 수 있음

export const useSharePageModeStore = create<SharePageState>((set) => {
  return {
    // spaceId: '',
    // sharePage: {
    //   pageId: '',
    //   profileImageLink: '/profile_1.png', // * default image 넣어야함
    //   layout: {
    //     styles: {}
    //   },
    //   title: '',
    //   description: '',
    //   privilege: null,
    //   children: []
    // },
    mode: 'VIEW',
    // isFetching: false,
    // isLoaded: false,
    // isFalture: false,
    setSharePageMode: (spaceMode: SharePageMode) => {
      set({ mode: spaceMode })
    }
    // loadSharePage: async (pageId: string) => {
    //   set(() => ({ isFetching: true, isLoaded: false, isFalture: false }))
    //   const { data } = await to(getSpaceMockAPI(pageId))
    //   if (data) {
    //     set(() => ({ sharePage: data, isFetching: false, isLoaded: true, isFalture: false }))
    //     return true
    //   }
    //   set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
    //   return false
    // },
    // loadSharePageFromBack: async (pageId?: string) => {
    //   set(() => ({ isFetching: true, isLoaded: false, isFalture: false }))
    //   if (!pageId) {
    //     set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
    //     return false
    //   }
    //   const { data, status } = await to(getSpaceFromBackAPI(pageId))
    //   if (data == null || status === 'failure') {
    //     set(() => ({ isFetching: false, isLoaded: false, isFalture: true }))
    //     return false
    //   }
    //   data.children = data.children.filter((item) => {
    //     if (
    //       typeof item.x !== 'number' ||
    //       typeof item.y !== 'number' ||
    //       typeof item.h !== 'number' ||
    //       typeof item.w !== 'number'
    //     ) {
    //       return false
    //     }
    //     return true
    //   })
    //   const mode = data.privilege === 'EDIT' ? 'EDIT' : 'VIEW'
    //   set(() => ({ sharePage: { ...data, pageId }, mode, isFetching: false, isLoaded: true, isFalture: false }))
    //   return true
    // },
    // setSharePage: (space: SharePage) => {
    //   set(() => ({ sharePage: space, isLoaded: true, isFalture: false }))
    // },
    // removeBlockById: async (blockId: string) => {
    //   set((state) => {
    //     for (let i = 0; i < state.sharePage.children.length; i++) {
    //       if (state.sharePage.children[i].objectId === blockId) {
    //         state.sharePage.children.splice(i, 1)
    //         break
    //       }
    //     }
    //     return { ...state }
    //   })
    // }
  }
})
