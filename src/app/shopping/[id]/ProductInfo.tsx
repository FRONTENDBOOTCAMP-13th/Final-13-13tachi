'use client';
import { getMember } from '@/data/functions/post';
import { ApiRes, MemberType, ProductTypeRes } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    <div className="lg:mt-20 lg:space-y-[3.75rem]">
      {/* ST: 품목 요약 */}
      <div>
        <h3 className="font-semibold text-dark-green lg:text-3xl">품목 요약</h3>
        <ul className="lg:mt-4 lg:pt-6 lg:pl-6 leading-[1.7] border-t border-light-gray list-disc">
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
        <h3 className="font-semibold text-dark-green lg:text-3xl">보관법</h3>
        <ul className="lg:mt-4 lg:pt-6 lg:pl-6 leading-[1.7] border-t border-light-gray list-disc">
          <li>{productRes.item.extra?.storage![0]}</li>
        </ul>
      </div>
      {/* ED: 보관법 */}

      {/* ST: 판매자 정보*/}
      <div>
        <h3 className="font-semibold text-dark-green  lg:text-3xl">
          판매자 정보
        </h3>
        <div className="flex items-center border-t border-light-gray lg:gap-16 lg:mt-4 lg:pt-6 lg:pl-6">
          <div className="flex items-center lg:gap-4 lg:w-[15rem]">
            <div className="relative aspect-square lg:w-[6.25rem]">
              <Image
                src={`${API_URL}/${seller.item.image}`}
                alt={`${seller.item.extra.farmName} 의 ${seller.item.name} 농부님 이미지`}
                fill
              />
            </div>
            <strong className="leading-[1.7] font-semibold lg:text-lg">
              {seller.item.extra.farmName}
              <br />
              {seller.item.name} 농부님
            </strong>
          </div>
          <ul className="leading-[1.7] list-disc">
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
