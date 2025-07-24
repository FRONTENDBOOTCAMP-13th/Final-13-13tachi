import Image from 'next/image';

// 임시 이미지 불러오기
import { LikePostItemType } from '@/types/post';
import { Bookmark } from 'lucide-react';
import { useActionState } from 'react';
import useUserStore from '@/zustand/useStore';
import { deleteBookmark } from '@/data/actions/post';

export default function LikeRecipeItem({ item }: { item: LikePostItemType }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useUserStore();
  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteBookmark,
    null,
  );
  console.log(deleteState, isDeleting);

  return (
    <div className="flex flex-col">
      <Image
        src={`${API_URL}/${item.image}`}
        alt={item.title}
        width={180}
        height={180}
        className="lg:w-[11.25rem] lg:h-[11.25rem] object-cover rounded-lg shadow-image"
      />
      <div className="relative text-center mt-2.5">
        <div className="absolute left-0">
          <form action={deleteAction}>
            <input
              type="hidden"
              name="accessToken"
              value={user?.token?.accessToken ?? ''}
            />
            <input type="hidden" name="_id" value={item._id} />
            <button className="hover:cursor-pointer">
              <Bookmark fill="green" />
            </button>
          </form>
        </div>
        <p className="">{item.title}</p>
      </div>
    </div>
  );
}
