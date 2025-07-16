import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../../images/profile.jpg';

import Button from '@/components/common/Button';

export default function LikeList() {
  return (
    <div className="flex flex-col justify-center items-center">
      <form className="flex flex-row justify-between lg:w-[49.875rem] border-1 border-light-gray lg:p-4.5 rounded-lg ">
        <div className="flex flex-row items-center gap-[1.5625rem]">
          <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
            <Image
              src={profilePic}
              alt="상품이미지"
              width={100}
              height={100}
              className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
            ></Image>
            <div className="flex flex-col justufy-center lg:gap-2">
              <div>
                <span className="lg:text-base font-semibold text-dark-green mr-0.5">
                  못난이 사과
                </span>
                <span className="lg:text-sm">(350g)</span>
              </div>
              <p className="lg:text-sm">3000원</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end lg:gap-2">
          <Button size="xxs" variant="green">
            장바구니 담기
          </Button>
          <Button size="xxs" variant="white">
            삭제
          </Button>
        </div>
      </form>
    </div>
  );
}
