import Image from 'next/image';

// 임시 이미지 불러오기
import emptyPic from '../../../images/emptybuylist.png';
import CustomLink from '@/components/common/CustomLink';

export default function EmptyBuyList() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={emptyPic}
        width={60}
        height={60}
        alt="장바구니 이미지"
        className="mb-3.5"
      />
      <span className="mb-10">
        <p className="text-xl font-semibold text-center mb-3">
          주문 내역이 없어요
        </p>
        <p className="text-sm">UgVeg의 상품을 구매해 보세요</p>
      </span>
      <CustomLink href="/shopping">상품 보러 가기</CustomLink>
    </div>
  );
}
