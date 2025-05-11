import postToS3 from '@/apis/imageS3';
import { postPost } from '@/apis/post';
import { courseMap } from '@/lib/courseMap';
import { getClientCookie } from '@/lib/getClientCookie';
import { PostType } from '@/lib/postType';
import { postSchema } from '@/schemas/postSchema';
import { usePostStore } from '@/stores/postStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { cookies } from 'next/headers';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type NewPostData = z.infer<typeof postSchema>;

export const usePostEditorForm = () => {
  const router = useRouter();
  const content = usePostStore((state) => state.content);
  const youtubeUrl = usePostStore((state) => state.youtubeUrl);
  const imageUrl = usePostStore((state) => state.imageUrl);
  const setEditorData = usePostStore((state) => state.setEditorData);

  const methods = useForm<NewPostData>({
    resolver: zodResolver(postSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      content: '',
      youtubeUrl: '',
      imageFile: undefined,
    },
  });

  const onSubmit = async (data: NewPostData) => {
    const course = getClientCookie('course');
    if (!course) return;
    const postType = courseMap[course] as PostType;

    try {
      let imageUrl = '';
      if (data.imageFile) {
        imageUrl = await postToS3(data.imageFile, 'post_image');
      }

      const response = await postPost(
        { postType: postType },
        {
          content: data.content,
          image_url: imageUrl,
          youtube_url: data.youtubeUrl,
        }
      );

      router.push(`/post/${response.data.data.id}`);
    } catch (e: any) {
      console.log(e);
    }
  };

  return {
    ...methods,
    onSubmit,
    imageUrl,
    youtubeUrl,
    content,
    setValue: methods.setValue,
  };
};
