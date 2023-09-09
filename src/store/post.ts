import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export type Post = {
  id: number
  title: string
  body: string
}

interface PostState {
  posts: Post[]
  addPost: (post: Post) => void
  removeAllPosts: VoidFunction
}

// @ts-ignore ㅎ ㅏ 최선인가..
export const usePostStore = create<PostState>((set) => {
  const store = {
    posts: [
      {
        id: 1,
        title: 'title',
        body: 'body'
      },
      {
        id: 2,
        title: 'title',
        body: 'body'
      }
    ],
    addPost: (post: Post) => {
      set((state) => ({ posts: [...state.posts, post] }))
    },
    removeAllPosts: () => {
      set({ posts: [] })
    }
  }

  // @ts-ignore
  return devtools(store, {
    enabled: process.env.NODE_ENV === 'development'
  })
})
