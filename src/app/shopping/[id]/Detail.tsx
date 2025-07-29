'use client';

import AddCartForm from '@/app/shopping/[id]/AddCartForm';
import LikesForm from '@/app/shopping/[id]/LikesForm';
import CustomLink from '@/components/common/CustomLink';
import { getLikeProducts } from '@/data/functions/post';
import { ApiRes, LikeItemType, ProductTypeRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

          <CustomLink
            variant="green"
            size="xxl"
            href={`/order?id=${id}&quantity=${quantity}`}
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
      <div className="lg:mt-20 lg:space-y-[3.75rem]">
        {/* ST: 품목 요약 */}
        <div>
          <h3 className="font-semibold text-dark-green lg:text-3xl">
            품목 요약
          </h3>
          <ul className="lg:mt-4 lg:pt-5 lg:pl-5 border-t border-light-gray">
            <li>
              큰 당근을 깎거나 수확시기를 앞당겨 작게 만든 당근이 아니에요.
              품종부터 아담한 스낵당근은 아삭한 식감과 은은한 단맛을 가지고
              있어요. 한 손에 쏘옥 들어오는 크기로 간식처럼 즐기기 좋아요.
            </li>
            <li>
              당근이 자라면서 상대적으로 햇빛에 많이 노출될 경우 윗부분이
              초록빛을 띌 수 있어요. 드시는 데에는 문제가 없으니 안심하고
              이용하셔도 좋아요.
            </li>
            <li>크기가 다양하고 모양이 개성 있어요.</li>
          </ul>
        </div>
        {/* ED: 품목 요약 */}

        {/* ST: 보관법*/}
        <div>
          <h3 className="font-semibold text-dark-green  lg:text-3xl">보관법</h3>
          <ul className="lg:mt-4 lg:pt-5 lg:pl-5 border-t border-light-gray">
            <li>습기 없이 냉장보관 / 5일</li>
          </ul>
        </div>
        {/* ED: 보관법 */}

        {/* ST: 판매자 정보*/}
        <div>
          <h3 className="font-semibold text-dark-green  lg:text-3xl">
            판매자 정보
          </h3>
          <div className="flex justify-between items-center border-t border-light-gray lg:mt-4 lg:pt-5 lg:pl-5">
            <div className="">
              {/* <div>
                <Image src="/" alt="/" width={1} height={1} />
              </div> */}
              <strong className="leading-[1.7] font-semibold lg:text-lg">
                달그락 농장
                <br /> 김영호 농부님
              </strong>
            </div>
            <ul>
              <li>
                강원 산골의 조용한 마을에서 혼자 농사를 짓는 김영호 농부는
                자연의 시간에 맞춰 일하는 것을 가장 중요하게 여깁니다.
              </li>
              <li>
                매일 새벽이면 작은 바구니를 들고 밭으로 나가, 흙 묻은 채소들을
                하나하나 손으로 수확합니다.
              </li>
              <li>
                농약이나 인공적인 처리를 하지 않기 때문에 작물의 모양은 일정하지
                않지만, 땅이 주는 본연의 생명력을 간직하고 있습니다.
              </li>
              <li>
                흠집난 모습도 그 작물이 자라온 시간과 정성을 보여주는
                흔적이라며, 버려지지 않고 식탁까지 가길 바라는 마음으로 농사를
                짓고 있습니다.
              </li>
            </ul>
          </div>
        </div>
        {/* ED: 판매자 정보 */}
      </div>
      {/* ED: 상품 정보*/}
    </>
  );
}
