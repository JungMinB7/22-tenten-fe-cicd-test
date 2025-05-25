import { create } from 'zustand';
import type { Post, Comment } from '@/stores/postType';

interface PostStore {
  // 게시글/댓글/대댓글 전역 상태
  postDetail: Post | null;
  commentDetail: Comment | null;

  // 에디터 상태
  content: string;
  youtubeUrl?: string;
  imageUrl?: string;

  // Setter
  setPostDetail: (post: Post) => void;
  setCommentDetail: (comment: Comment) => void;

  // 에디터 Setter
  setEditorData: (data: {
    content: string;
    youtubeUrl?: string;
    imageUrl?: string;
  }) => void;

  resetEditor: () => void;

  // 기타 유틸
  clearDetail: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  // 전역 상태
  postDetail: null,
  commentDetail: null,

  // 에디터 상태
  content: '',
  youtubeUrl: '',
  imageUrl: '',

  // Setter
  setPostDetail: (post) => set({ postDetail: post }),
  setCommentDetail: (comment) => set({ commentDetail: comment }),

  setEditorData: ({ content, youtubeUrl, imageUrl }) =>
    set((state) => ({
      ...state,
      content,
      youtubeUrl,
      imageUrl,
    })),

  resetEditor: () =>
    set((state) => ({
      ...state,
      content: '',
      youtubeUrl: '',
      imageUrl: '',
    })),

  clearDetail: () =>
    set({
      postDetail: null,
      commentDetail: null,
    }),
}));
