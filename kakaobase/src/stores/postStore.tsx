import { create } from 'zustand';

export interface PostState {
  id: number;
  userId: number;
  nickname: string;
  userProfileUrl: string;
  isMine: boolean;
  type: 'post' | 'comment' | 'recomment';
  content?: string;
  ImageUrl?: string;
  youtubeUrl?: string;
  youtubeSummary?: string;
  commentCount: number;
  likeCount: number;
  isFollowing: boolean;
  isLiked: boolean;
  createdAt: string;
  onClickFollow: () => void;
  onClickReport: () => void;
  onClickUser: () => void;
  onClickPostCard: () => void;
  onClickDelete: () => void;
  onClickLike: () => void;
  onClickYoutubeSummary: () => void;
  setPostCardInfo: (post: Partial<PostState>) => void;
}

interface PostEditorState {
  content?: string;
  youtubeUrl?: string;
  imageUrl?: string;
  setEditorData: (data: {
    content: string;
    youtubeUrl: string;
    imageUrl: string;
  }) => void;
  resetEditor: () => void;
}

export const usePostStore = create<PostState & PostEditorState>((set) => ({
  id: 1,
  userId: 1,
  nickname: '',
  userProfileUrl: '',
  isMine: true,
  type: 'post',
  content: '',
  ImageUrl: '',
  youtubeUrl: '',
  youtubeSummary: '',
  commentCount: 0,
  likeCount: 0,
  isFollowing: false,
  isLiked: false,
  createdAt: Date.now().toString(),
  onClickFollow: () => {},
  onClickReport: () => {},
  onClickUser: () => {},
  onClickPostCard: () => {},
  onClickDelete: () => {},
  onClickLike: () => {},
  onClickYoutubeSummary: () => {},
  setPostCardInfo: (post) => set((state) => ({ ...state, ...post })),
  setEditorData: (data) => set((state) => ({ ...state, ...data })),
  resetEditor: () =>
    set((state) => ({
      ...state,
      content: '',
      youtubeUrl: '',
      imageUrl: '',
    })),
}));
