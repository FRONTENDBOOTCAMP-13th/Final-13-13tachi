import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../../images/profile.jpg';
import Button from '@/components/common/Button';

export default function BuyItem() {
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
        <Image
          src={profilePic}
          alt="상품이미지"
          className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
        ></Image>
        <div className="flex flex-col justufy-center lg:gap-2">
          <p>
            <span className="lg:text-base font-semibold text-dark-green mr-2.5">
              못난이 사과
            </span>
            <span className="lg:text-xs">(350g)</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="lg:text-base">3000원</span>
            <span className="lg:text-xs">무료배송</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end lg:gap-2">
        <Button size="lg" variant="green">
          레시피 작성하기
        </Button>
        <Button size="lg" variant="white">
          장바구니 담기
        </Button>
      </div>
    </div>
  );
}
