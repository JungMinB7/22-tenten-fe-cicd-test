import { z } from 'zod';

export const courseEnum = z.enum([
  '클라우드 네이티브 제주 1기',
  '클라우드 네이티브 제주 2기',
  '카카오테크 부트캠프 1기',
  '카카오테크 부트캠프 2기',
  'KDT 관계자',
  '기타 사용자',
]);

export const signupStep2Schema = z.object({
  name: z
    .string()
    .min(1, { message: '*이름을 입력해 주세요.' })
    .max(5, { message: '*이름은 최대 5글자까지 입력가능합니다.' })
    .regex(/^[가-힣]{1,5}$/, { message: '*이름 형식이 올바르지 않습니다.' }),
  nickname: z
    .string()
    .min(1, { message: '*닉네임을 입력해 주세요.' })
    .max(16, { message: '*닉네임은 최대 16까지 입력할 수 있습니다.' })
    .regex(/^[a-z]+\.{1}[a-z]+$/, {
      message: '*닉네임 형식이 올바르지 않습니다.',
    }),
  course: z.preprocess(
    (val) => (val === '' ? '수강 과정을 선택해 주세요.' : val),
    courseEnum,
    { message: '수강 과정을 선택해 주세요.' }
  ),
  githubUrl: z
    .string()
    .min(1, { message: '*자신의 깃허브 프로필 url을 입력해 주세요.' })
    .startsWith('https://github.com/', {
      message: '*깃허브 url 형식이 올바르지 않습니다.',
    }),
});
