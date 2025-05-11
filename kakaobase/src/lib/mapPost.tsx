import type { PostState } from '@/stores/postStore';

interface PostResponseDto {
  id: number;
  content?: string;
  image_url?: string;
  youtube_url?: string;
  comment_count: number;
  like_count: number;
  is_liked: boolean;
  is_mine: boolean;
  created_at: string;
  user: {
    id: number;
    nickname: string;
    image_url: string | null;
    is_following: boolean;
  };
}

export function mapToPostState(post: PostResponseDto): PostState {
  return {
    id: post.id,
    userId: post.user.id,
    nickname: post.user.nickname,
    userProfileUrl: post.user.image_url ?? '',
    isMine: post.is_mine,
    type: 'post',
    content: post.content ?? '',
    ImageUrl: post.image_url ?? '',
    youtubeUrl: post.youtube_url ?? '',
    youtubeSummary: '',
    commentCount: post.comment_count,
    likeCount: post.like_count,
    isFollowing: post.user.is_following,
    isLiked: post.is_liked,
    createdAt: post.created_at,
    onClickFollow: () => {},
    onClickReport: () => {},
    onClickUser: () => {},
    onClickPostCard: () => {},
    onClickDelete: () => {},
    onClickLike: () => {},
    onClickYoutubeSummary: () => {},
    setPostCardInfo: () => {},
  };
}
