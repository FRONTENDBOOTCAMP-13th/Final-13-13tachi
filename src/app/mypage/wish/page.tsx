import WishList from '@/app/mypage/wish/WishList';

export default async function Wish() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-col gap-2">
        <h3 className="w-full text-xl font-semibold">내가 찜한 상품</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <WishList />
    </div>
  );
}
