import Image from 'next/image';
import Link from 'next/link';

interface AllItems {
  title: string;
  details: string;
  price: string;
  img: string;
}

const shoppingArr: AllItems[] = [
  {
    title: '감쟈합니다',
    details: '1kg',
    price: '3,250원',
    img: '/assets/shopping/items1.png',
  },
  {
    title: '바니바니바니바니 당근당근',
    details: '2개',
    price: '1,800원',
    img: '/assets/shopping/items2.png',
  },
  {
    title: '길쭉이 오이',
    details: '52개',
    price: '5,252원',
    img: '/assets/shopping/items3.png',
  },
  {
    title: '구 양배추 현 조세호',
    details: '1개',
    price: '1,840원',
    img: '/assets/shopping/items4.png',
  },
  {
    title: '단호하게 단호박',
    details: '1개',
    price: '2,100원',
    img: '/assets/shopping/items5.png',
  },
  {
    title: 'bro콜리',
    details: '200g',
    price: '1,500원',
    img: '/assets/shopping/items6.png',
  },
  {
    title: '토맛 토마토',
    details: '400g',
    price: '3,400원',
    img: '/assets/shopping/items7.png',
  },
  {
    title: '감쟈합니다',
    details: '1kg',
    price: '3,250원',
    img: '/assets/shopping/items1.png',
  },
  {
    title: '바니바니바니바니 당kjkk근당근',
    details: '2개',
    price: '1,800원',
    img: '/assets/shopping/items2.png',
  },
  {
    title: '길쭉이 오이',
    details: '52개',
    price: '5,252원',
    img: '/assets/shopping/items3.png',
  },
  {
    title: '구 양배추 현 조세호',
    details: '1개',
    price: '1,840원',
    img: '/assets/shopping/items4.png',
  },
  {
    title: '단호하게 단호박',
    details: '1개',
    price: '2,100원',
    img: '/assets/shopping/items5.png',
  },
  {
    title: 'bro콜리',
    details: '200g',
    price: '1,500원',
    img: '/assets/shopping/items6.png',
  },
  {
    title: '토맛 토마토',
    details: '400g',
    price: '3,400원',
    img: '/assets/shopping/items7.png',
  },
  {
    title: '감쟈합니다',
    details: '1kg',
    price: '3,250원',
    img: '/assets/shopping/items1.png',
  },
  {
    title: '바니바니바니바니 당kjkk근당근',
    details: '2개',
    price: '1,800원',
    img: '/assets/shopping/items2.png',
  },
  {
    title: '길쭉이 오이',
    details: '52개',
    price: '5,252원',
    img: '/assets/shopping/items3.png',
  },
  {
    title: '구 양배추 현 조세호',
    details: '1개',
    price: '1,840원',
    img: '/assets/shopping/items4.png',
  },
  {
    title: '단호하게 단호박',
    details: '1개',
    price: '2,100원',
    img: '/assets/shopping/items5.png',
  },
  {
    title: 'bro콜리',
    details: '200g',
    price: '1,500원',
    img: '/assets/shopping/items6.png',
  },
];

export default function AllItems() {
  const AllItemList = shoppingArr.map((item, index) => {
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
          <div className="lg:mt-4">
            <h4 className="relative flex gap-2 lg:text-base">
              {item.title}
              <span className="text-gray lg:mt-[0.0625rem] lg:text-sm">
                {item.details}
              </span>
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
            </h4>
            <strong className="inlin-block text-orange lg:mt-1.5 lg:text-xl">
              {item.price}
            </strong>
          </div>
        </Link>
      </li>
    );
  });
  return (
    <ul className="grid lg:mt-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-15">
      {AllItemList}
    </ul>
  );
}
