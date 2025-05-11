'use client';

import { useRef } from 'react';

export default function TestUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        📷 이미지 업로드
      </button>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          console.log('✅ 선택된 파일:', file);
          alert(file?.name || '파일 없음');
        }}
      />
    </div>
  );
}
