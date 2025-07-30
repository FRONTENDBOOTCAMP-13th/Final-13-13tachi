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
      <main>
        <div className="mx-auto lg:max-w-5xl lg:pt-[4.0625rem] lg:py-25">
          {/* ST: Title */}
          <div>
            <h2 className="text-gray">
              <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
              <Link href="/shopping">장보기</Link>&nbsp;&gt;&nbsp;
              {productRes.item.name}
            </h2>
            <h3 className="font-bold lg:mt-5 lg:text-5xl">
              {productRes.item.name}
            </h3>
          </div>
          {/* ED: Title */}

          {/* ST: 상품 상세 내용 */}

          <Detail productRes={productRes} id={id} />

          {/* ED: 상품 상세 내용 */}

          {/* ST: 목록으로*/}
          <div className="w-fit mx-auto lg:mt-[4.0625rem]">
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
