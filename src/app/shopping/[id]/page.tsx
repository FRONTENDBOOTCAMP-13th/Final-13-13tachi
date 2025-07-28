import CustomLink from '@/components/common/CustomLink';
import { getProductDetails } from '@/data/functions/post';
import { ProductTypeRes } from '@/types';
import Detail from '@/app/shopping/[id]/Detail';

interface shoppingPageProps {
  params: {
    id: string;
  };
}

export default async function ShoppingDetail({ params }: shoppingPageProps) {
  const _id = Number(params.id);
  const productRes = (await getProductDetails(_id)) as ProductTypeRes;

  return (
    <>
      <main>
        <div className="mx-auto lg:max-w-5xl lg:pt-[4.0625rem] lg:py-25">
          {/* ST: Title */}
          <div>
            <p className="text-gray">HOME &gt; 장보기</p>
            <h2 className="font-bold lg:mt-5 lg:text-5xl">
              {productRes.item.name}
            </h2>
          </div>
          {/* ED: Title */}

          {/* ST: 상품 상세 내용 */}
          <Detail productRes={productRes} id={_id} />
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
