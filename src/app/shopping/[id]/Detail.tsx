'use client';

import AddCartForm from '@/app/shopping/[id]/AddCartForm';
import LikesForm from '@/app/shopping/[id]/LikesForm';
import ProductInfo from '@/app/shopping/[id]/ProductInfo';
import CustomLink from '@/components/common/CustomLink';
import { getLikeProducts } from '@/data/functions/post';
import { ApiRes, LikeItemType, ProductTypeRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface DetailProps {
  productRes: ProductTypeRes;
  id: number;
}

export default function Detail({
  productRes, // 상품 상세 불러온 데이터
  id, // 현재 상품 번호
}: DetailProps) {
  const { user } = useUserStore(); // 로그인 정보
  const accessToken = user?.token?.accessToken; // accessToken 값
  const router = useRouter();

  const [quantity, setQuantity] = useState(1); // 수량 상태
  const [likeRes, setLikeRes] = useState<ApiRes<LikeItemType[]> | null>(null); // 좋아요 목록 최신 상태 관리
  const [isLike, setIsLike] = useState(false); // 찜하기 상태

  // 현재 상품이 찜하기 데이터에 있는지
  const likeItems =
    likeRes && likeRes.ok === 1 && Array.isArray(likeRes.item)
      ? likeRes.item.some((like: LikeItemType) => like.product?._id == id)
      : false;

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
      <div className="mt-7.5 w-full md:mx-auto md:mt-7.5 md:w-fit lg:mt-10 ">
        <div className="relative w-full aspect-[67.5/45] md:w-[675px]  ">
          <Image
            src={productRes.item.mainImages![0].path}
            alt={`${productRes.item.name} 이미지`}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="mt-7.5 md:mt-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5 w-[calc(100%-1.375rem)]">
              <p className="font-bold text-2xl md:text-3xl lg:text-4xl truncate">
                {productRes.item.name}
              </p>
              <span className="text-gray font-normal text-sm md:text:base lg:text-lg">
                ({productRes.item.extra?.details})
              </span>
            </div>
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
          <div className="flex justify-between items-center mt-3">
            <strong className="flex items-center gap-2.5 font-semibold text-orange text-lg md:text-xl lg:text-2xl">
              {productRes.item.price?.toLocaleString()}원
              <span className="text-gray font-normal text-xs md:text-sm lg:text-base">
                무료배송
              </span>
            </strong>
            {/* ST: 카운터 */}
            <div className="flex flex-row justify-between items-center w-16 h-6 border-[0.0625rem] border-light-gray rounded-lg md:w-20 md:h-[1.875rem]">
              <button
                type="button"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-1 lg:px-2 hover:cursor-pointer"
              >
                <Minus strokeWidth={3} className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs md:text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity < 99 ? quantity + 1 : 99)}
                className="px-1 lg:px-2 hover:cursor-pointer"
              >
                <Plus strokeWidth={3} className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* ED: 카운터 */}
          </div>
        </div>
        <div className="flex justify-end flex-wrap gap-3 mt-7.5 md:mt-10 md:gap-4 lg:justify-between ">
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
          <CustomLink
            variant="green"
            size="xxl"
            href={`/order?id=${id}&quantity=${quantity}`}
            onClick={e => {
              e.stopPropagation();
              if (!user) {
                e.preventDefault();
                Swal.fire({
                  icon: 'warning',
                  text: '로그인 후 이용해주세요',
                  confirmButtonText: '확인',
                }).then(result => {
                  if (result.isConfirmed) router.replace('/login');
                });
              }
            }}
          >
            구매하기
          </CustomLink>
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
      <ProductInfo productRes={productRes} />
      {/* ED: 상품 정보*/}
    </>
  );
}
