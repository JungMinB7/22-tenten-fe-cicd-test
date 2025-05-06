import { postSchema } from '@/schemas/postSchema';
import { usePostStore } from '@/stores/postStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type NewPostData = z.infer<typeof postSchema>;

// async function uploadToS3(file: File): Promise<string> {
//   const res = await fetch('/api/presigned-url', {
//     method: 'POST',
//     body: JSON.stringify({ filename: file.name, type: file.type }),
//     headers: { 'Content-Type': 'application/json' },
//   });
//   const { url } = await res.json();

//   await fetch(url, {
//     method: 'PUT',
//     headers: { 'Content-Type': file.type },
//     body: file,
//   });

//   return url.split('?')[0];
// }

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
    let uploadedUrl = '';
    // if (data.imageFile) {
    //   uploadedUrl = await uploadToS3(data.imageFile);
    // }

    const newPostId = 100;

    setEditorData({
      content: data.content ?? '',
      youtubeUrl: data.youtubeUrl ?? '',
      imageUrl: uploadedUrl,
    });

    router.push(`/post/${newPostId}`);
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
