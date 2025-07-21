'use client';
// import Link from 'next/link';

import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../../images/profile.jpg';
import Button from '@/components/common/Button';
import useUserStore from '@/zustand/useStore';

export default function User() {
  const { user } = useUserStore();
  console.log('user in MyPage:', user);
  return (
    <div className="h-full">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2">
        <h3 className="lg:w-full lg:text-xl font-semibold">회원정보</h3>
        <hr className="text-light-gray w-full mb-5" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="contents">
          <Image
            src={profilePic}
            alt="프로필 이미지"
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-[50%] mb-6"
          />
          <div className="flex flex-col gap-4 text-base">
            <p className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">이름</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>{user?.name ?? '홍길동'}</span>
            </p>
            <p className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">이메일</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>{user?.email ?? 'asd123@naver.com'}</span>
            </p>
            <p className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">전화번호</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>{user?.phone ?? 'asd123@naver.com'}</span>
            </p>
            <p className="grid grid-cols-[3.875rem_1.125rem_1fr] items-center">
              <span className="font-semibold">주소</span>
              <div className="border-l-2 border-light-gray h-3 "></div>
              <span>
                {`${user?.postcode ?? ''} ${user?.addressDetail1 ?? ''} ${user?.addressDetail2 ?? ''}`}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="xxl" variant="green">
            회원정보 수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
