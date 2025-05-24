export type PostType = 'post' | 'comment' | 'recomment';

export interface BasePost {
  id: number;
  userId: number;
  nickname: string;
  userProfileUrl: string;
  isMine: boolean;
  type: PostType;
  content?: string;
  likeCount: number;
  isLiked: boolean;
  isFollowing: boolean;
  createdAt: string;
}

export interface Post extends BasePost {
  commentCount: number;
  youtubeUrl?: string;
  imageUrl?: string;
  youtubeSummary?: string;
}

export interface Comment extends BasePost {
  commentCount: number;
}

export interface Recomment extends BasePost {}

export type PostEntity = Post | Comment | Recomment;
