import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../../images/profile.jpg';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import { ProductType } from '@/types';

export default async function CartList({ product }: { product: ProductType }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between lg:w-[49.375rem] lg:my-[30px]">
        <div className="flex flex-row items-center gap-[1.5625rem]">
          <label htmlFor="inputCheckBox" className="sr-only"></label>
          <Checkbox />
          <div className="flex flex-row lg:gap-3.5 lg:h-[6.25rem]">
            <Image
              src={profilePic}
              alt="상품이미지"
              width={100}
              height={100}
              className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
            ></Image>
            <div className="flex flex-col justify-between">
              <div>
                <>
                  <span className="lg:text-base font-semibold text-dark-green mr-0.5">
                    {product.name}
                  </span>
                  <span className="lg:text-sm">(350g)</span>
                </>
                <p className="lg:text-sm mt-1">{product.price}</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-5 border-[0.0625rem] rounded-lg lg:w-20 lg:h-[1.875rem] p-1">
                <button className="lg:text-base font-semibold hover:cursor-pointer">
                  -
                </button>
                <span className="lg:text-sm">1</span>
                <button className="lg:text-base font-semibold hover:cursor-pointer">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end gap-[1.5625rem]">
          <Button size="sm" variant="white">
            삭제
          </Button>
          <span className="lg:text-base font-semibold">3000원</span>
        </div>
      </div>
      <hr className="text-light-gray w-full" />
    </div>
  );
}
