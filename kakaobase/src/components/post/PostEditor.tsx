'use client';

import { Image, Youtube } from 'lucide-react';
import SubmitButton from '../common/SubmitButton';
import { NewPostData, usePostEditorForm } from '@/hooks/post/usePostEditorForm';
import { useEffect, useState } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

function HelperText({ errorMessage }: { errorMessage: string }) {
  return <div className="text-redHeart text-xs h-4">{errorMessage}</div>;
}

function ContentInput({
  register,
  errors,
}: {
  register: UseFormRegister<NewPostData>;
  errors: FieldErrors<NewPostData>;
}) {
  //로그인을 가정한 임시 사용자
  const nickname = 'daisy.kim';

  return (
    <div className="w-full">
      <div className="text-md font-bold">{nickname}</div>

      <textarea
        {...register('content')}
        placeholder="지금 무슨 일이 발생하고 있나요?"
        className="w-full focus:outline-none bg-transparent text-xs resize-none max-h-60"
        rows={1}
        onInput={(e) => {
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }}
      />

      <HelperText errorMessage={errors.content?.message || ''} />
    </div>
  );
}

function YoutubeInput({
  errors,
  register,
}: {
  errors: FieldErrors<NewPostData>;
  register: UseFormRegister<NewPostData>;
}) {
  return (
    <div className="w-full">
      <div className="flex gap-2 font-bold">
        <Youtube />
        <div className="text-md font-bold">유튜브 링크</div>
      </div>
      <input
        {...register('youtubeUrl')}
        placeholder="유튜브 링크를 입력하세요."
        className="w-full focus:outline-none bg-transparent text-xs"
      />
      <HelperText errorMessage={errors.youtubeUrl?.message || ''} />
    </div>
  );
}

function ImageInput({
  setValue,
  errors,
  watch,
}: {
  errors: FieldErrors<NewPostData>;
  setValue: UseFormSetValue<NewPostData>;
  watch: UseFormWatch<NewPostData>;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imageFile = watch('imageFile');

  useEffect(() => {
    if (imageFile && imageFile instanceof File) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);
  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="flex gap-2 items-center cursor-pointer"
      >
        <Image className="w-4 h-4" />
        <div className="text-xs px-4 py-1 bg-myLightBlue w-40 text-center rounded-full text-textOnLight">
          이미지 업로드
        </div>
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setValue('imageFile', file, { shouldValidate: true });
          }
        }}
      />

      {/* 이미지 미리보기 */}
      {previewUrl && (
        <div className="mt-2 flex flex-col gap-2">
          <img
            src={previewUrl}
            alt="미리보기"
            className="rounded-sm max-w-full"
          />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(null);
              setValue('imageFile', undefined, { shouldValidate: true });
            }}
            className="text-xs w-fit rounded-full text-redHeart underline"
          >
            사진 삭제
          </button>
        </div>
      )}
      <HelperText errorMessage={errors.imageFile?.message || ''} />
    </div>
  );
}

export default function PostEditor() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
    watch,
    setValue,
  } = usePostEditorForm();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col justify-between items-center h-full w-full py-10 text-textColor">
        <div className="flex flex-col gap-6 w-full px-12">
          <ContentInput errors={errors} register={register} />
          <YoutubeInput errors={errors} register={register} />
          <ImageInput errors={errors} watch={watch} setValue={setValue} />
        </div>
        <SubmitButton
          text="게시글 업로드"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </div>
    </div>
  );
}
