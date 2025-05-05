'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PostState } from '@/stores/postStore';
import { useYoutubeHook } from '@/hooks/post/useYoutubeHook';
import CountsInfo from './CountsInfo';
import { UserProfile, UserInfo } from './UserInfo';

export default function PostCard({ post }: { post: PostState }) {
  const router = useRouter();

  const { isOpen, summary, summaryButton, showSummary } = useYoutubeHook();

  function navDetail() {
    router.push(`/post/${post.id}`);
  }

  return (
    <div className="flex">
      <div className="flex w-full bg-containerColor mx-8 my-4 p-4 gap-2 rounded-2xl">
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

          <div className="w-64 flex justify-center content-center">
            {!post.youtubeUrl ? (
              post.ImageUrl ? (
                <Image
                  src={post.ImageUrl}
                  alt="이미지"
                  height={144}
                  width={152}
                  className="rounded-lg"
                  priority
                />
              ) : null
            ) : (
              <iframe
                width="256"
                height="144"
                loading="lazy"
                src={`https://www.youtube-nocookie.com/embed/${post.youtubeUrl}`}
                title="유튜브 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            )}
          </div>
          {post.youtubeUrl ? (
            <div className="text-xs text-textColor">
              <div className="cursor-pointer" onClick={showSummary}>
                {summaryButton}
              </div>
              {isOpen ? <div>{summary}</div> : null}
            </div>
          ) : null}
          <CountsInfo post={post} />
        </div>
      </div>
    </div>
  );
}
