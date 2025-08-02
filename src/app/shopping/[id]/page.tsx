import CustomLink from '@/components/common/CustomLink';
import { getProductDetails } from '@/data/functions/post';
import { ProductTypeRes } from '@/types';
import Detail from '@/app/shopping/[id]/Detail';
import Link from 'next/link';

interface shoppingPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function ShoppingDetail({ params }: shoppingPageProps) {
  const { id } = await params;
  const productRes = (await getProductDetails(Number(id))) as ProductTypeRes;

  return (
    <>
      <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
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
      </main>
    </>
  );
}
