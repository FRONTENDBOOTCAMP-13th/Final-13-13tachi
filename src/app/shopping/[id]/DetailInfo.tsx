'use client';

import Detail from '@/app/shopping/[id]/Detail';
import Loading from '@/app/shopping/[id]/Loading';
import CustomLink from '@/components/common/CustomLink';
import { getProductDetails } from '@/data/functions/product';
import { ApiRes, ProductItemType } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DetailInfo({ id }: { id: number }) {
  const [productRes, setProductRes] = useState<ApiRes<ProductItemType> | null>(
    null,
  );

  useEffect(() => {
    getProductDetails(id)
      .then(setProductRes)

      .catch(err => {
        console.error('상품 가져오기 실패:', err);
        setProductRes({ ok: 0, message: '에러 발생!' });
      });
  }, []);

  if (!productRes) {
    return <Loading />;
  }

  return (
    <>
      {productRes.ok === 1 && (
        <div className="mx-auto px-5 pt-7.5 pb-15 md:px-7.5 md:pt-12.5 md:pb-20 lg:px-0 lg:max-w-5xl lg:pt-[4.0625rem] lg:pb-25">
          {/* ST: Title */}
          <div>
            <h2 className="text-gray text-xs md:text-sm lg:text-base">
              <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
              <Link href="/shopping">장보기</Link>&nbsp;&gt;&nbsp;
              {productRes.item.name}
            </h2>

            <h3 className="mt-5 font-bold text-3xl md:text-4xl lg:text-5xl">
              {productRes.item.name}
            </h3>
          </div>
          {/* ED: Title */}

          {/* ST: 상품 상세 내용 */}

          <Detail productRes={productRes} id={id} />

          {/* ED: 상품 상세 내용 */}

          {/* ST: 목록으로*/}
          <div className="w-fit mx-auto mt-12.5 lg:mt-[4.0625rem]">
            <CustomLink
              variant="green"
              size="xxl"
              type="button"
              href="/shopping"
            >
              목록으로
            </CustomLink>
          </div>
          {/* ED: 목록으로*/}
        </div>
      )}
    </>
  );
}
