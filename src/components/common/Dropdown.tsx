'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useUserStore from '@/zustand/useStore';
import Swal from 'sweetalert2';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Dropdown() {
  const { resetUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  //로그아웃 시 토큰 삭제
  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetUser();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    Swal.fire({
      icon: 'info',
      title: '로그아웃 완료',
      text: '로그아웃이 완료 되었습니다.',
      confirmButtonText: '확인',
    });
  };

  // 바깥 아무곳이나 클릭 시 드롭다운 닫아짐
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) //클릭한 요소가 드롭다운 내부가 아니면 닫도록
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside); //document에 마우스 클릭 이벤트 등록
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(prev => !prev)}>
        <Image
          className="w-8 h-8 object-cover rounded-full mr-2"
          src={user?.image ? `${API_URL}/${user.image}` : '/profile.svg'}
          width="32"
          height="32"
          alt={`${user?.name} 프로필 이미지`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 translate-x-[-50%] w-[6.875rem] h-[185px]  bg-white border border-light-gray shadow-[var(--btn-shadow)] rounded-lg z-50 text-sm">
          <form onSubmit={handleLogout}>
            <ul className="py-[12px] flex flex-col items-center ">
              <li>
                <Link
                  href="/mypage/cart"
                  className="block text-black pb-[7px] hover:font-semibold"
                >
                  장바구니
                </Link>
              </li>
              <li>
                <Link
                  href="/mypage/wish"
                  className="block  text-black pb-[7px]  hover:font-semibold"
                >
                  찜한 상품
                </Link>
              </li>
              <li>
                <Link
                  href="/mypage/order"
                  className="block  text-black pb-[7px] hover:font-semibold"
                >
                  주문내역
                </Link>
              </li>
              <li>
                <Link
                  href="/mypage/recipe"
                  className="block text-black pb-[7px] hover:font-semibold"
                >
                  레시피
                </Link>
              </li>
              <li>
                <Link
                  href="/mypage/user"
                  className="block text-black pb-[7px] hover:font-semibold"
                >
                  회원정보
                </Link>
              </li>
              <li>
                <button
                  type="submit"
                  className=" text-black hover:font-semibold "
                >
                  로그아웃
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </div>
  );
}
