'use client';

import { Share2 } from 'lucide-react';

export default function ShareButton() {
  const handleShareClick = () => {
    if (!navigator.clipboard) {
      alert('클립보드 복사 기능을 지원하지 않는 브라우저입니다.');
      return;
    }
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('현재 페이지 주소가 클립보드에 복사되었습니다!');
    });
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleShareClick}
        aria-label="공유하기"
        type="button"
        className="cursor-pointer"
      >
        <Share2 strokeWidth={1} fill="true" />
      </button>
    </div>
  );
}
