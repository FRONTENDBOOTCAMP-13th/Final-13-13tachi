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
      <Link
        href={`/recipe/${item.post_id}`}
        className="overflow-hidden rounded-lg"
      >
        <Image
          src={item.image}
          alt={item.title}
          width={180}
          height={180}
          className="lg:w-[11.25rem] lg:h-[11.25rem] w-full aspect-square object-cover rounded-lg shadow-image transition-transform duration-300 hover:scale-110"
        />
      </Link>
      <div className="grid grid-cols-[1fr_auto] mt-2.5 items-center">
        <Link href={`/recipe/${item.post_id}`} className="flex justify-center">
          <span className="w-fit line-clamp-1 gap-1 text-center md:text-base text-sm">
            {item.title}
          </span>
        </Link>
        <div className="h-fit">
          <form action={action.deleteAction} className="leading-1">
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
      </div>
    </div>
  );
}
