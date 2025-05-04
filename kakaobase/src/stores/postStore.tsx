import { create } from 'zustand';

interface PostState {
  id: number;
  userId: number;
  userName: string;
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
  createdAt: string;
  onClickFollow: () => void;
  onClickReport: () => void;
  onClickUser: () => void;
  onClickPostCard: () => void;
  onClickDelete: () => void;
  onClickMoreInfo: () => void;
  onClickYoutubeSummary: () => void;
  setPostCardInfo: (post: Partial<PostState>) => void;
}

export const usePostStore = create<PostState>((set) => ({
  id: 1,
  userId: 1,
  userName: '',
  userProfileUrl: '',
  isMine: false,
  type: 'post',
  content: '',
  ImageUrl: '',
  youtubeUrl: '',
  youtubeSummary: '',
  commentCount: 0,
  likeCount: 0,
  isFollowing: false,
  createdAt: Date.now().toString(),
  onClickFollow: () => {},
  onClickReport: () => {},
  onClickUser: () => {},
  onClickPostCard: () => {},
  onClickDelete: () => {},
  onClickMoreInfo: () => {},
  onClickYoutubeSummary: () => {},
  setPostCardInfo: (post) => set((state) => ({ ...state, ...post })),
}));
