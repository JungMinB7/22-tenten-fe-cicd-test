import { z } from 'zod';

export const emailAuthSchema = z.object({
  email: z
    .string()
    .min(1, { message: '*이메일을 입력해 주세요.' })
    .email({ message: '*잘못된 이메일 형식입니다.' }),
  code: z.string().length(6, { message: '' }),
});
