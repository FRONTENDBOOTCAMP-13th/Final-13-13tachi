import Image from 'next/image';
import Link from 'next/link';

type Item = {
  img: string;
  title: string;
  details: string;
  price: string | number;
};

type ProductCardProps = {
  filteredItems: Item[];
};

export default function ProductCard({ filteredItems }: ProductCardProps) {
  const ProductCardList = filteredItems.map((item, index) => {
    return (
      <li key={index}>
        {/* //TODO 상세 페이지 연결 */}
        <Link href="#">
          <Image
            src={item.img}
            alt={`${item.title} 이미지`}
            width={240}
            height={240}
            className="rounded-[0.5rem]"
          />
          <div className="relative lg:mt-4 w-full">
            <div className="flex gap-2 w-full lg:pr-6">
              <h4 className="truncate  lg:text-base ">{item.title}</h4>
              <span className="text-gray lg:mt-[0.0625rem] lg:text-sm">
                {item.details}
              </span>
            </div>
            <strong className="inlin-block text-orange lg:mt-1.5 lg:text-xl">
              {item.price}
            </strong>
            {/* TODO 내 찜목록은 filled로 보여지도록, 클릭하면 내 찜목록에 토글 되도록, 아이콘 filled와 토글 되도록, 로그인 안 되어 있을 경우에 클릭하면 로그인 페이지 안내 모달 나오도록 */}
            <button
              type="button"
              className="absolute top-[0.25rem] right-0 cursor-pointer"
            >
              <Image
                src="/ico-zzim.svg"
                alt="찜하기 아이콘"
                width={16}
                height={15}
              />
            </button>
          </div>
        </Link>
      </li>
    );
  });
  return (
    <ul className="grid lg:mt-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-15">
      {ProductCardList}
    </ul>
  );
}
