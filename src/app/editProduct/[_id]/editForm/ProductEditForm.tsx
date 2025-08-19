'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { modifyProduct } from '@/data/actions/product';
import { getSellerProduct } from '@/data/functions/product';
import { ApiRes, ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProductEditForm({ item }: { item: number }) {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const router = useRouter();

  const [res, setRes] = useState<ApiRes<ProductType> | null>(null);
  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (accessToken) {
      getSellerProduct(item, accessToken).then(setRes);
    } else {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      }).then(result => {
        if (result.isConfirmed) router.replace('/login');
      });
    }
  }, [accessToken]);

  const [, setSelectImage] = useState('');

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
  const [, registAction] = useActionState(modifyProduct, null);
  return (
    <div>
      <form
        action={registAction}
        className="flex flex-col items-center justify-center mb-[6.25rem]"
      >
        <input
          type="hidden"
          name="accessToken"
          value={user?.token?.accessToken ?? ''}
        />
        <input type="hidden" name="seller_id" value={`${Number(user?._id)}`} />
        <input type="hidden" name="_id" value={`${item}`} />
        {/* <input type="hidden" name="_id" value={} /> */}
        <div className="flex md:flex-row flex-col gap-8 mt-8 mb-[6.25rem] justify-center md:items-start items-center">
          <div className="relative w-[300px] h-[300px] aspect-square bg-[#dedede] rounded-lg">
            <label className="absolute" htmlFor="attach">
              <span className="hidden">상품 이미지</span>
              <Image
                width={300}
                height={300}
                src={res?.ok ? res.item.mainImages[0].path : '/empty_image.png'}
                alt="이미지 추가하기"
                className="w-[300px] h-[300px] aspect-square object-cover rounded-lg"
              />
            </label>
            <input
              type="file"
              id="attach"
              accept="image/*"
              // placeholder="이미지를 선택하세요"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              name="attach"
              onChange={handleImageChange}
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
                defaultValue={res?.ok ? res.item.name : ''}
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
                defaultValue={res?.ok ? res.item.extra?.details : ''}
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
                defaultValue={res?.ok ? res.item.quantity : ''}
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
                defaultValue={res?.ok ? res.item.price : ''}
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
                defaultValue={res?.ok ? res.item.extra?.category : ''}
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
                defaultValue={res?.ok ? res.item.extra?.info : ''}
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
                defaultValue={res?.ok ? res.item.extra?.storage : ''}
              />
            </div>
          </div>
        </div>
        <Button>상품 정보 수정</Button>
      </form>
    </div>
  );
}
