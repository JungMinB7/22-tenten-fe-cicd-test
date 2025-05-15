'use client';
import Image from 'next/image';
import { useYoutubeHook } from '@/hooks/post/useYoutubeHook';
import CountsInfo from './CountsInfo';
import { UserProfile, UserInfo } from './UserInfo';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { extractYoutubeVideoId } from '@/lib/formatYoutube';
import { PostEntity } from '@/stores/postType';
import { LoaderCircle } from 'lucide-react';

export default function PostCard({ post }: { post: PostEntity }) {
  const router = useRouter();
  const params = useParams();

  const postId = Number(params.postId);

  const { loading, isOpen, summaryButton, summary, showSummary } =
    useYoutubeHook(post.id);

  const path = usePathname();
  function navDetail() {
    if (post.type === 'post') {
      router.push(`/post/${post.id}`);
    } else if (post.type === 'comment') {
      router.push(`/post/${postId}/comment/${post.id}`);
    }
  }

  return (
    <div className="flex">
      <div className="flex w-full bg-containerColor mx-6 my-4 p-4 gap-2 rounded-2xl">
        <UserProfile post={post} />
        <div className="w-full flex flex-col gap-2 text-textColor">
          <UserInfo post={post} />
          <div onClick={navDetail}>
            {!path.includes('post')
              ? post.content && (
                  <div className="w-full text-sm overflow-hidden cursor-pointer line-clamp-2 text-ellipsis">
                    {post.content}
                  </div>
                )
              : post.content && (
                  <div className="w-full text-sm overflow-hidden cursor-pointer">
                    {post.content}
                  </div>
                )}
            <div className="flex justify-center content-center w-full overflow-hidden rounded-lg">
              {post.type === 'post' && 'imageUrl' in post && post.imageUrl && (
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
                post.youtubeUrl && (
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
          {post.type === 'post' && 'youtubeUrl' in post && post.youtubeUrl && (
            <div className="text-xs text-textColor">
              <div className="cursor-pointer" onClick={showSummary}>
                {loading ? (
                  <div className="text-xs flex text-center items-center gap-4">
                    <LoaderCircle
                      width={12}
                      height={12}
                      className="animate-spin text-textColor"
                    />{' '}
                    로딩 중...
                  </div>
                ) : (
                  summaryButton
                )}
              </div>
              {isOpen ? <div>{summary}</div> : null}
            </div>
          )}
          <CountsInfo post={post} />
        </div>
      </div>
    </div>
  );
}
