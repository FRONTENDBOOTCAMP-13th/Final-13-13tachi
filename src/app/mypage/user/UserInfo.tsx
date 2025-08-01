'use client';

import Image from 'next/image';
import useUserStore from '@/zustand/useStore';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMember } from '@/data/functions/post';
import { ApiRes, MemberType } from '@/types';
import Loading from '@/app/mypage/user/Loading';
import CustomLink from '@/components/common/CustomLink';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserInfo() {
  const { user } = useUserStore();
  const router = useRouter();
  const [res, setRes] = useState<ApiRes<MemberType> | null>(null);

  useEffect(() => {
    const user_id = Number(user?._id);
    getMember(user_id).then(setRes);
  }, [user]);

  // console.log(user?.phone);

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

  // useEffect(() => {
  //   if (res && res.ok === 0) {
  //     router.replace('/error');
  //   }
  // }, [res, router]);

  if (!res) {
    return <Loading />;
  }

  let socialLogin = null;
  let editPage = ``;

  if (user?.loginType === 'kakao') {
    socialLogin = (
      <div className="flex">
        <Image src="/kakao_logo.png" width={20} height={20} alt="네이버 로고" />
        <span className="text-sm ml-2">카카오 로그인</span>
      </div>
    );
    editPage = `/socialedit`;
  } else if (user?.loginType === 'naver') {
    socialLogin = (
      <div className="flex">
        <Image src="/naver_logo.png" width={20} height={20} alt="네이버 로고" />
        <span className="text-sm ml-2">네이버 로그인</span>
      </div>
    );
    editPage = `/socialedit`;
  } else {
    editPage = `/edit`;
  }

  return (
    <div className="lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <div className="flex flex-col gap-2">
        <h3 className="w-full text-xl font-semibold">회원정보</h3>
        <hr className="text-light-gray w-full mb-5" />
      </div>
      <div className="flex flex-col">
        <div className="">
          <Image
            src={user?.image ? `${API_URL}/${user.image}` : '/profile.svg'}
            alt={`${user?.name} 프로필 이미지`}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-[50%] mb-6"
          />
          {/* <div className="lg:h-20 lg:w-20 rounded-[50%] bg-gray-200" /> */}
          <div className="flex flex-col gap-4 text-base">
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">이름</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                {res.ok ? (
                  res.item.name
                ) : (
                  <div className="lg:h-4 lg:w-10 rounded-lg bg-gray-200" />
                )}
              </span>
            </div>
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">이메일</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                {res.ok ? (
                  (res.item.email ?? socialLogin)
                ) : (
                  <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-200" />
                )}
              </span>
            </div>
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">전화번호</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                {res.ok ? (
                  res.item.phone
                ) : (
                  <div className="lg:h-4 lg:w-10 rounded-lg bg-gray-200" />
                )}
              </span>
            </div>
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">주소</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                {res.ok ? (
                  <span>
                    {`${res.item.addressDetail1 ?? ''} ${res.item.addressDetail2 ?? ''}`}
                    {res.item.postcode ? ` (${res.item.postcode})` : ''}
                  </span>
                ) : (
                  <div className="lg:h-4 lg:w-10 rounded-lg bg-gray-200" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-[4.0625rem]">
        <CustomLink size="xxl" variant="green" href={editPage}>
          회원정보 수정하기
        </CustomLink>
      </div>
    </div>
  );
}
