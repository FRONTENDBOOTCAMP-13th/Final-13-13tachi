'use client';

import { Share2 } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ShareButton() {
  const handleShareClick = () => {
    if (!navigator.clipboard) {
      Swal.fire({
        icon: 'error',
        title: '복사 실패',
        text: '클립보드 복사 기능을 지원하지 않는 브라우저입니다.',
        confirmButtonText: '확인',
      });
      return;
    }
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      Swal.fire({
        icon: 'success',
        title: '복사 완료',
        text: '현재 페이지 주소가 클립보드에 복사되었습니다!',
        confirmButtonText: '확인',
      });
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
