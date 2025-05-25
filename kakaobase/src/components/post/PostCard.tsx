'use client';
import Image from 'next/image';
import CountsInfo from './CountsInfo';
import { UserProfile, UserInfo } from './UserInfo';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { extractYoutubeVideoId } from '@/lib/formatYoutube';
import { PostEntity } from '@/stores/postType';
import clsx from 'clsx';
import summaryCondition from '@/lib/summaryCondition';

export default function PostCard({ post }: { post: PostEntity }) {
  const router = useRouter();
  const params = useParams();

  const postId = Number(params.postId);

  const path = usePathname();
  function navDetail() {
    if (post.type === 'post') {
      sessionStorage.setItem('scrollToPostId', String(post.id));
      sessionStorage.setItem('scrollPosition', String(window.scrollY));
      router.push(`/post/${post.id}`);
    } else if (post.type === 'comment') {
      router.push(`/post/${postId}/comment/${post.id}`);
    }
  }
  return (
    <div className="flex" data-post-id={post.id} onClick={navDetail}>
      <div className="flex mx-6 w-full my-2">
        <div
          className={clsx(
            'flex w-full bg-containerColor p-4 gap-2 cursor-pointer rounded-2xl',
            path === '/' &&
              'hover:-translate-y-1 hover:shadow-md transition-transform duration-100',
            path.includes('post') &&
              post.type === 'comment' &&
              'hover:-translate-y-1 hover:shadow-md transition-transform duration-100'
          )}
        >
          <UserProfile post={post} />
          <div className="w-full flex flex-col gap-2 text-textColor">
            <UserInfo post={post} />
            <div>
              {!path.includes('post')
                ? post.content && (
                    <div className="w-full text-sm overflow-hidden cursor-pointer line-clamp-2 text-ellipsis break-all">
                      {post.content}
                    </div>
                  )
                : post.content && (
                    <div className="w-full text-sm overflow-hidden cursor-pointer break-all">
                      {post.content}
                    </div>
                  )}
              <div className="flex justify-center content-center w-full overflow-hidden rounded-lg">
                {post.type === 'post' &&
                  'imageUrl' in post &&
                  post.imageUrl && (
                    <Image
                      src={post.imageUrl}
                      alt="이미지"
                      className="w-full h-auto object-cover rounded-lg"
                      width={0}
                      height={0}
                      priority
                      sizes="100vw"
                      unoptimized
                    />
                  )}
                {post.type === 'post' &&
                  'youtubeUrl' in post &&
                  post.youtubeUrl &&
                  post.youtubeSummary !== 'VIDEO_NOT_FOUND' &&
                  post.youtubeSummary !== 'INVALID_YOUTUBE_URL' && (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${extractYoutubeVideoId(
                        post.youtubeUrl
                      )}`}
                      title="유튜브 영상"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full aspect-video"
                    ></iframe>
                  )}
              </div>
            </div>
            {post.type === 'post' &&
              'youtubeUrl' in post &&
              post.youtubeUrl &&
              post.youtubeSummary && (
                <div className="text-xs text-textColor">
                  {summaryCondition({ summary: post.youtubeSummary })}
                </div>
              )}
            <CountsInfo post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}
