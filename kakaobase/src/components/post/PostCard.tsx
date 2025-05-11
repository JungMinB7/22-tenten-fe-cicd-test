'use client';
import Image from 'next/image';
import { PostState } from '@/stores/postStore';
import { useYoutubeHook } from '@/hooks/post/useYoutubeHook';
import CountsInfo from './CountsInfo';
import { UserProfile, UserInfo } from './UserInfo';
import { useRouter } from 'next/navigation';
import { extractYoutubeVideoId } from '@/lib/formatYoutube';

export default function PostCard({ post }: { post: PostState }) {
  const router = useRouter();
  const { isOpen, summaryButton, showSummary } = useYoutubeHook();
  function navDetail() {
    router.push(`/post/${post.id}`);
  }
  return (
    <div className="flex">
      <div className="flex w-full bg-containerColor mx-6 my-4 p-4 gap-2 rounded-2xl">
        <UserProfile post={post} />
        <div className="w-full flex flex-col gap-2 text-textColor">
          <UserInfo post={post} />

          {post.content ? (
            <div
              className="w-full text-sm overflow-hidden cursor-pointer line-clamp-2 text-ellipsis"
              onClick={navDetail}
            >
              {post.content}
            </div>
          ) : null}

          <div className="flex justify-center content-center w-full overflow-hidden rounded-lg">
            {!post.youtubeUrl ? (
              post.ImageUrl ? (
                <Image
                  src={post.ImageUrl}
                  alt="이미지"
                  className="w-full h-auto object-cover rounded-lg"
                  width={0}
                  height={0}
                  priority
                  sizes="100vw"
                />
              ) : null
            ) : (
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
          {post.youtubeUrl ? (
            <div className="text-xs text-textColor">
              <div className="cursor-pointer" onClick={showSummary}>
                {summaryButton}
              </div>
              {isOpen ? <div>{post.youtubeSummary}</div> : null}
            </div>
          ) : null}
          <CountsInfo post={post} />
        </div>
      </div>
    </div>
  );
}
