'use client';

import AddCartForm from '@/app/shopping/[id]/AddCartForm';
import LikesForm from '@/app/shopping/[id]/LikesForm';
import Button from '@/components/common/Button';
import CustomLink from '@/components/common/CustomLink';
import { getLikeProducts } from '@/data/functions/post';
import { ApiRes, LikeItemType, ProductTypeRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Detail({
  productRes, // 상품 상세 불러온 데이터
  id, // 현재 상품 번호
}: {
  productRes: ProductTypeRes;
  id: number;
}) {
  const { user } = useUserStore(); // 로그인 정보
  const accessToken = user?.token?.accessToken; // accessToken 값

  const [quantity, setQuantity] = useState(1); // 수량 상태
  const [likeRes, setLikeRes] = useState<ApiRes<LikeItemType[]> | null>(null); // 좋아요 목록 최신 상태 관리
  const [isLike, setIsLike] = useState(false); // 찜하기 상태

  const likeItems = // 현재 상품이 찜하기 데이터에 있는지
    likeRes &&
    Object.entries(likeRes)
      .filter(([key]) => key !== 'ok')
      .some(([, value]) => value.product._id == id);

  useEffect(() => {
    //찜하기 데이터에 있는지 여부를 isLike/setIsLike로 상태관리
    setIsLike(likeItems!);
  }, [likeItems]);

  useEffect(() => {
    if (!accessToken) return;

    getLikeProducts(accessToken)
      .then(res => {
        setLikeRes(res);
      })
      .catch(err => {
        console.error('찜 가져오기 실패:', err);
        setLikeRes({ ok: 0, message: '에러 발생!' });
      });
  }, [accessToken]);

  const handleLikeChange = (newIsLike: boolean) => setIsLike(newIsLike); // 자식 컴포넌트(LikesForm)에서 버튼 동작시 isLike 상태 업데이트 시켜줌

  return (
    <>
      {/* ST: 상단 상품 정보*/}
      <div className="mx-auto w-fit lg:mt-10">
        <div className="relative w-[675px] aspect-[67.5/45] ">
          <Image
            src={`${API_URL}/${productRes.item.mainImages![0].path}`}
            alt={`${productRes.item.name} 이미지`}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="lg:mt-10">
          <div className="flex justify-between items-center">
            <p className="flex items-center font-bold lg:gap-2.5 lg:text-4xl">
              {productRes.item.name}
              <span className="text-gray font-normal lg:text-lg">
                ({productRes.item.extra?.details})
              </span>
            </p>
            {/* ST: 찜하기 */}
            <LikesForm
              isLike={isLike}
              accessToken={accessToken!}
              likeRes={likeRes!}
              productRes={productRes}
              handleLikeChange={handleLikeChange}
              user={user}
            />
            {/* ED: 찜하기 */}
          </div>
          <div className="flex justify-between items-center lg:mt-3">
            <strong className="flex items-center font-semibold text-orange lg:gap-2.5 lg:text-2xl">
              {productRes.item.price?.toLocaleString()}원
              <span className="text-gray font-normal lg:text-base">
                무료배송
              </span>
            </strong>
            {/* ST: 카운터 */}
            <div className="flex flex-row justify-between items-center border-[0.0625rem] border-light-gray rounded-lg lg:w-20 lg:h-[1.875rem]">
              <button
                type="button"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="lg:text-base lg:px-2 font-semibold hover:cursor-pointer"
              >
                <Minus strokeWidth={3} className="w-3.5 h-3.5" />
              </button>
              <span className="lg:text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity < 99 ? quantity + 1 : 99)}
                className="lg:text-base lg:px-2 font-semibold hover:cursor-pointer"
              >
                <Plus strokeWidth={3} className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* ED: 카운터 */}
          </div>
        </div>
        <div className="flex justify-between lg:mt-10">
          {/* ST: 레시피 보러가기 */}
          <CustomLink
            variant="white"
            size="xxl"
            type="button"
            href={`/recipe/search/${productRes.item.extra?.category![0]}`}
          >
            레시피 보러가기
          </CustomLink>
          {/* ED: 레시피 보러가기 */}

          {/* ST: 구매하기 */}
          <form>
            <Button variant="green" size="xxl" type="button">
              구매하기
            </Button>
          </form>
          {/* ED: 구매하기 */}

          {/* ST: 장바구니 */}
          <AddCartForm
            accessToken={accessToken!}
            id={id}
            quantity={quantity}
            user={user}
          />

          {/* ED: 장바구니 */}
        </div>
      </div>
      {/* ED: 상단 상품 정보*/}

      {/* ST: 상품 정보*/}
      <div className="lg:mt-20">
        <h3 className="font-bold lg:text-3xl">상품 정보</h3>
        <div className="border-t border-light-gray lg:mt-5 lg:pt-10">
          <div>
            <Image
              src="/assets/shopping/details-2.png"
              alt="판매자 사진"
              width={964}
              height={104}
              className="mx-auto"
            />
          </div>
          <div>
            <Image
              src="/assets/shopping/details-3.jpg"
              alt="상품 상세 정보"
              width={1024}
              height={3899}
            />
          </div>
        </div>
      </div>
      {/* ED: 상품 정보*/}
    </>
  );
}
