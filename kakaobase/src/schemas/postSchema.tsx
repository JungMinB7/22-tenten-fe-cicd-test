import { z } from 'zod';

export const postSchema = z
  .object({
    content: z
      .string()
      .max(2000, { message: '최대 2000자까지만 입력할 수 있습니다.' })
      .optional(),
    youtubeUrl: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          val.startsWith('https://www.youtube.com/') ||
          val.startsWith('https://youtu.be/'),
        {
          message: '유튜브 링크 형식이 올바르지 않습니다.',
        }
      ),
    imageFile: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || /\.(png|jpeg|jpg|webp)$/i.test(file.name), {
        message: '이미지 파일 형식은 png, jpg, jpeg, webp만 가능합니다.',
      }),
  })
  .superRefine((data, ctx) => {
    const { youtubeUrl, imageFile, content } = data;

    // 1. 둘 다 비어 있으면 오류
    if (!content && !youtubeUrl && !imageFile) {
      ctx.addIssue({
        path: ['content'],
        code: z.ZodIssueCode.custom,
        message: '하나 이상의 항목을 입력해야 합니다.',
      });
    }

    // 2. 둘 다 있으면 오류
    if (youtubeUrl && imageFile) {
      ctx.addIssue({
        path: ['youtubeUrl'],
        code: z.ZodIssueCode.custom,
        message: '유튜브 링크와 이미지 중 하나만 입력할 수 있습니다.',
      });
      ctx.addIssue({
        path: ['imageFile'],
        code: z.ZodIssueCode.custom,
        message: '유튜브 링크와 이미지 중 하나만 입력할 수 있습니다.',
      });
    }
  });
