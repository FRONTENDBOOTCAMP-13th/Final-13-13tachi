import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../images/profile.jpg';

export default function OrderList() {
  return (
    <div className="flex flex-row items-center lg:gap-[1.875rem] lg:h-[6.25rem]">
      <Image
        src={profilePic}
        alt="상품이미지"
        className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
      ></Image>
      <div className="flex flex-col justufy-center">
        <p className="lg:text-base font-semibold">
          <span className=" mr-1">못난이 사과</span>
          <span className="lg:text-xs font-medium mr-2.5">(350g)</span>
          <span>1</span>
          <span>개</span>
        </p>
        <p>
          <span className="lg:text-sm">3000원</span>
        </p>
      </div>
    </div>
  );
}
