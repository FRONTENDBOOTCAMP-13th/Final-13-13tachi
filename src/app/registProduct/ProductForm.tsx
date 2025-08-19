'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { registProduct } from '@/data/actions/product';
import useUserStore from '@/zustand/useStore';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useActionState, useState } from 'react';

export default function ProductForm() {
  const { user } = useUserStore();
  const [selectImage, setSelectImage] = useState('');
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader(); //생성자 함수를 통해 생성
      // onload 이벤트 핸들러 함수를 통해 파일 내용을 setState에 넣는다.
      reader.onload = () => {
        setSelectImage(reader.result as string);
      };
      // 이미지 파일을 텍스트로 사용할 수 있게 변환해준다.
      reader.readAsDataURL(file);
    }
  };
  const [, registAction] = useActionState(registProduct, null);
  return (
    <form
      action={registAction}
      className="flex flex-col items-center justify-center mb-[6.25rem]"
    >
      <input
        type="hidden"
        name="accessToken"
        value={user?.token?.accessToken ?? ''}
      />
      <input type="hidden" name="seller_id" value={`${user?._id}`} />
      <div className="flex md:flex-row flex-col gap-8 mt-8 mb-[6.25rem] justify-center md:items-start items-center">
        <div className="relative w-[300px] h-[300px] aspect-square bg-[#dedede] rounded-lg">
          <label className="absolute" htmlFor="attach">
            <span className="hidden">상품 이미지</span>
            {!selectImage ? (
              <ImagePlus
                width={50}
                height={50}
                id="attach"
                className="m-[125px] "
              />
            ) : (
              <Image
                width={300}
                height={300}
                src={selectImage}
                alt="이미지 추가하기"
                className="w-[300px] h-[300px] aspect-square object-cover rounded-lg"
              />
            )}
          </label>
          <input
            type="file"
            id="attach"
            accept="image/*"
            // placeholder="이미지를 선택하세요"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            name="attach"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="flex flex-col gap-4 text-sm md:text-base md:w-fit w-full">
          <div className="md:grid md:grid-cols-[1fr_4fr] flex flex-col md:items-center md:gap-4 gap-2">
            <label htmlFor="name" className="">
              상품명
              <span className="text-light-red lg:text-sm ml-1">*</span>
            </label>
            <Input
              type="text"
              id="name"
              width="md3"
              name="name"
              placeholder="상품명을 입력하세요."
              required
            />
          </div>
          <div className="md:grid md:grid-cols-[1fr_4fr] flex flex-col md:items-center md:gap-4 gap-2">
            <label htmlFor="details" className="">
              중량<span className="text-sm"> (단위 포함)</span>
              <span className="text-light-red lg:text-sm ml-1">*</span>
            </label>
            <Input
              type="text"
              id="details"
              name="details"
              width="md3"
              placeholder="ex) 150g"
              required
            />
          </div>
          <div className="md:grid md:grid-cols-[1fr_4fr] flex flex-col md:items-center md:gap-4 gap-2">
            <label htmlFor="quantity" className="">
              총 수량
              <span className="text-light-red lg:text-sm ml-1">*</span>
            </label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              width="md3"
              placeholder="ex) 100"
              required
              max={999}
            />
          </div>
          <div className="md:grid md:grid-cols-[1fr_4fr] flex flex-col md:items-center md:gap-4 gap-2">
            <label htmlFor="price" className="">
              가격
              <span className="text-light-red lg:text-sm ml-1">*</span>
            </label>
            <Input
              id="price"
              type="number"
              name="price"
              width="md3"
              placeholder="ex) 10000"
              required
            />
          </div>
          <div className="md:grid md:grid-cols-[1fr_4fr] flex flex-col md:items-center md:gap-4 gap-2">
            <label htmlFor="category" className="">
              카테고리
              <span className="text-light-red lg:text-sm ml-1">*</span>
            </label>
            <Input
              type="text"
              name="category"
              id="category"
              width="md3"
              placeholder="ex) 채소, 과일"
            />
          </div>
          <div className="md:grid md:grid-cols-[1fr_4fr] flex flex-col md:items-center md:gap-4 gap-2">
            <label htmlFor="info" className="">
              상품 정보
              <span className="text-light-red lg:text-sm ml-1">*</span>
            </label>
            <Input
              type="text"
              id="info"
              name="info"
              width="lg2"
              placeholder="상품 상세 정보를 입력하세요(최소 10글자)"
              minLength={10}
              required
            />
          </div>
          <div className="md:grid md:grid-cols-[1fr_4fr] flex flex-col md:items-center md:gap-4 gap-2">
            <label htmlFor="name" className="">
              상품 보관 안내
              <span className="text-light-red lg:text-sm ml-1">*</span>
            </label>
            <Input
              type="text"
              name="storage"
              id="storage"
              width="md3"
              placeholder="상품 보관 안내를 입력하세요."
              required
            />
          </div>
        </div>
      </div>
      <Button>상품 등록</Button>
    </form>
  );
}
