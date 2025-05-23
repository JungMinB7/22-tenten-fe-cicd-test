import {
  PostEntity,
  Post,
  Comment,
  Recomment,
  PostType,
} from '@/stores/postType';

export function mapToPostEntity(post: any, type: PostType): PostEntity {
  const base = {
    id: post.id,
    userId: post.user.id,
    nickname: post.user.nickname,
    userProfileUrl: post.user.image_url ?? '',
    isMine: post.is_mine,
    type,
    content: post.content ?? '',
    likeCount: post.like_count,
    isLiked: post.is_liked,
    isFollowing: post.user.is_following,
    createdAt: post.created_at,
  };

  if (type === 'post') {
    return {
      ...base,
      commentCount: post.comment_count,
      youtubeUrl: post.youtube_url ?? '',
      imageUrl: post.image_url ?? '',
      youtubeSummary: post.youtube_summary ?? '',
    } as Post;
  }

  if (type === 'comment') {
    return {
      ...base,
      commentCount: post.recomment_count,
    } as Comment;
  }

  return base as Recomment;
}
