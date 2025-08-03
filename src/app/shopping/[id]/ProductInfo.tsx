'use client';
import { getMember } from '@/data/functions/post';
import { ApiRes, MemberType, ProductTypeRes } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductInfo({
  productRes,
}: {
  productRes: ProductTypeRes;
}) {
  const [seller, setSeller] = useState<ApiRes<MemberType> | null>(null); // 판매자 정보

  useEffect(() => {
    getMember(Number(productRes.item.seller_id))
      .then(res => {
        if (res.ok === 1) setSeller(res);
      })
      .catch(err => {
        console.error('회원 정보 가져오기 실패:', err);
        setSeller({ ok: 0, message: '에러 발생!' } as ApiRes<MemberType>);
      });
  }, []);

  let sellerInfo: MemberType | null = null;
  if (seller && seller.ok === 1) {
    sellerInfo = seller.item;
  }

  if (!seller) return <div>로딩 중...</div>;
  if (seller.ok === 0) return <div>{seller.message}</div>;

  return (
    <div className="mt-12.5 space-y-12.5 md:mt-15 lg:mt-20 lg:space-y-[3.75rem]">
      {/* ST: 품목 요약 */}
      <div>
        <h4 className="font-semibold text-dark-green text-lg md:text-2xl lg:text-3xl">
          품목 요약
        </h4>
        <ul className="mt-3 pt-4 pl-4 leading-[1.7] border-t border-light-gray list-disc text-sm md:text-base md:mt-4 md:pt-5 md:pl-5 lg:pt-6 lg:pl-6">
          <li>{productRes.item.extra?.info![0]}</li>
          <li>{productRes.item.extra?.info![1]}</li>
          {productRes.item.extra?.info![2] ? (
            <li>{productRes.item.extra?.info![2]}</li>
          ) : null}
        </ul>
      </div>
      {/* ED: 품목 요약 */}

      {/* ST: 보관법*/}
      <div>
        <h4 className="font-semibold text-dark-green text-lg md:text-2xl lg:text-3xl">
          보관법
        </h4>
        <ul className="mt-3 pt-4 pl-4 leading-[1.7] border-t border-light-gray list-disc text-sm md:text-base md:mt-4 md:pt-5 md:pl-5 lg:pt-6 lg:pl-6">
          <li>{productRes.item.extra?.storage![0]}</li>
        </ul>
      </div>
      {/* ED: 보관법 */}

      {/* ST: 판매자 정보*/}
      <div>
        <h4 className="font-semibold text-dark-green text-lg md:text-2xl lg:text-3xl">
          판매자 정보
        </h4>
        <div className="flex flex-col items-start gap-6 mt-3 pt-4 pl-4 leading-[1.7] border-t border-light-gray list-disc text-sm md:flex-row md:gap-0 md:mt-4 md:pt-5 md:pl-5 md:text-base lg:pt-6 lg:pl-6">
          <div className="flex items-center gap-4 w-60 md:mr-8 lg:mr-12">
            <div className="relative w-20 aspect-square rounded-lg overflow-hidden md:w-25">
              <Image
                src={seller.item.image}
                alt={`${seller.item.extra.farmName} 의 ${seller.item.name} 농부님 이미지`}
                fill
              />
            </div>
            <strong className="leading-[1.7] font-semibold text-base md:text-lg">
              {seller.item.extra.farmName}
              <br />
              {seller.item.name} 농부님
            </strong>
          </div>
          <ul className="leading-[1.7] list-disc flex-1">
            <li>{sellerInfo?.extra.info?.[0]}</li>
            <li>{sellerInfo?.extra.info?.[1]}</li>
            <li>{sellerInfo?.extra.info?.[2]}</li>
            <li>{sellerInfo?.extra.info?.[3]}</li>
          </ul>
        </div>
      </div>
      {/* ED: 판매자 정보 */}
    </div>
  );
}
