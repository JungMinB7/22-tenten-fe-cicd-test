import { create } from 'zustand';
import type { Post, Comment, Recomment } from '@/stores/postType';

interface PostStore {
  // 게시글/댓글/대댓글 전역 상태
  postDetail: Post | null;
  postList: Post[];
  commentDetail: Comment | null;
  commentList: Comment[];
  recommentList: Record<number, Recomment[]>;

  // 에디터 상태
  content: string;
  youtubeUrl?: string;
  imageUrl?: string;

  // Setter
  setPostDetail: (post: Post) => void;
  setPostList: (posts: Post[]) => void;
  setCommentDetail: (comment: Comment) => void;
  setCommentList: (comments: Comment[]) => void;
  setRecommentList: (commentId: number, recomments: Recomment[]) => void;

  // 에디터 Setter
  setEditorData: (data: {
    content: string;
    youtubeUrl?: string;
    imageUrl?: string;
  }) => void;
  // appendComment: (comment: Comment) => void;
  // appendRecomment: (commentId: number, recomment: Recomment) => void;

  resetEditor: () => void;

  // 기타 유틸
  clearDetail: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  // 전역 상태
  postDetail: null,
  postList: [],
  commentDetail: null,
  commentList: [],
  recommentList: {},

  // 에디터 상태
  content: '',
  youtubeUrl: '',
  imageUrl: '',

  // Setter
  setPostDetail: (post) => set({ postDetail: post }),
  setPostList: (posts) => set({ postList: posts }),
  setCommentDetail: (comment) => set({ commentDetail: comment }),
  setCommentList: (comments) => set({ commentList: comments }),
  setRecommentList: (commentId, recomments) =>
    set((state) => ({
      recommentList: { ...state.recommentList, [commentId]: recomments },
    })),

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

  // appendComment: (comment: Comment) =>
  //   set((state) => ({
  //     commentList: [...state.commentList, comment],
  //   })),

  // appendRecomment: (commentId: number, recomment: Recomment) =>
  //   set((state) => ({
  //     recommentList: {
  //       ...state.recommentList,
  //       [commentId]: [...(state.recommentList[commentId] || []), recomment],
  //     },
  //   })),
}));
