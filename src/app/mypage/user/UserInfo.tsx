'use client';
import Link from 'next/link';
import Image from 'next/image';

// 임시 이미지 불러오기
import Button from '@/components/common/Button';
import useUserStore from '@/zustand/useStore';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserInfo() {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user === null || user === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (!user) {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      }).then(result => {
        if (result.isConfirmed) router.replace('/login');
      });
    }
  }, [user]);

  console.log('user in MyPage:', user);
  return (
    <div className="lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <div className="flex flex-col gap-2">
        <h3 className="w-full text-xl font-semibold">회원정보</h3>
        <hr className="text-light-gray w-full mb-5" />
      </div>
      <div className="flex flex-col">
        <div className="">
          <Image
            src={
              user?.image ? `${API_URL}/${user.image}` : '/images/front-end.png'
            }
            alt={`${user?.name} 프로필 이미지`}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-[50%] mb-6"
          />
          {/* <div className="lg:h-20 lg:w-20 rounded-[50%] bg-gray-200" /> */}
          <div className="flex flex-col gap-4 text-base">
            <div className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">이름</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>
                {user?.name ?? (
                  <div className="lg:h-4 lg:w-10 rounded-lg bg-gray-200" />
                )}
              </span>
            </div>
            <div className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">이메일</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>
                {user?.email ?? (
                  <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-200" />
                )}
              </span>
            </div>
            <div className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">전화번호</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>
                {user?.phone ?? (
                  <div className="lg:h-4 lg:w-25 rounded-lg bg-gray-200" />
                )}
              </span>
            </div>
            <div className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">주소</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>
                {`${user?.addressDetail1 ?? ''} ${user?.addressDetail2 ?? ''} (${user?.postcode ?? ''})`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-[4.0625rem]">
        <Link href="/edit">
          <Button size="xxl" variant="green">
            회원정보 수정하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
