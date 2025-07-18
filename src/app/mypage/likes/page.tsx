// 비어있는 경우
// import EmptyLikes from '@/app/mypage/likes/EmptyLikes';

// 찜목록
import LikeList from '@/app/mypage/likes/LikeList';

export default async function Likes() {
  return (
    <main className="flex flex-col gap-4 h-full">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2">
        <h3 className="lg:w-full lg:text-xl font-semibold">내가 찜한 상품</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <div className="flex flex-col gap-2.5">
        <LikeList />
        <LikeList />
        <LikeList />
      </div>
      {/* <div className="h-full">
        <EmptyLikes />
      </div> */}
    </main>
  );
}
