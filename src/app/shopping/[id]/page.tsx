import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import CustomLink from '@/components/common/CustomLink';
import { getProductDetails } from '@/data/functions/post';
import { ProductTypeRes } from '@/types';
import Detail from '@/app/shopping/[id]/Detail';

export default async function ShoppingDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  const productRes = (await getProductDetails(id)) as ProductTypeRes;

  return (
    <>
      <Header />
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
          <Detail productRes={productRes} id={id} />
          {/* ED: 상품 상세 내용 */}

          {/* ST: 목록으로*/}
          <div className="w-fit mx-auto lg:mt-[4.0625rem]">
            <CustomLink
              variant="green"
              size="xxl"
              type="button"
              href="/shopping" //TODO 나중에 링크 수정
            >
              목록으로
            </CustomLink>
          </div>
          {/* ED: 목록으로*/}
        </div>
      </main>
      <Footer />
    </>
  );
}
