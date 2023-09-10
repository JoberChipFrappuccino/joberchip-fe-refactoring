import { create } from 'zustand'

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

export const usePostStore = create<PostState>((set) => {
  return {
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
})
