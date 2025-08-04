import Image from 'next/image';
import { LikePostItemType } from '@/types/recipe';
import { Bookmark } from 'lucide-react';
import useUserStore from '@/zustand/useStore';
import Link from 'next/link';

interface LikePostActionType {
  deleteAction: (FormData: FormData) => void;
}

export default function BookmarkRecipeItem({
  item,
  action,
}: {
  item: LikePostItemType;
  action: LikePostActionType;
}) {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col w-full">
      <Link href={`/recipe/${item._id}`} className="overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          width={180}
          height={180}
          className="lg:w-[11.25rem] lg:h-[11.25rem] w-full aspect-square object-cover rounded-lg shadow-image transition-transform duration-300 hover:scale-110"
        />
      </Link>
      <div className="relative text-center mt-2.5">
        <div className="absolute right-0">
          <form action={action.deleteAction}>
            <input
              type="hidden"
              name="accessToken"
              value={user?.token?.accessToken ?? ''}
            />
            <input type="hidden" name="_id" value={item._id} />
            <button className="hover:cursor-pointer">
              <Bookmark fill="black" />
            </button>
          </form>
        </div>
        <Link href={`/recipe/${item._id}`}>{item.title}</Link>
      </div>
    </div>
  );
}
