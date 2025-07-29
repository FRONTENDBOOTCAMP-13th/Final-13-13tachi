import Image from 'next/image';
import { MyPostType } from '@/types/post';
import Link from 'next/link';

export default function MyRecipeItem({ item }: { item: MyPostType }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="flex flex-col">
      <Link href={`/recipe/${item._id}`}>
        <Image
          src={`${API_URL}/${item.image}`}
          alt={item.title}
          width={180}
          height={180}
          className="lg:w-[11.25rem] lg:h-[11.25rem] md:w-36 md:h-36 w-34 h-34 object-cover rounded-lg shadow-image"
        />
      </Link>
      <div className="relative text-center mt-2.5">
        <Link href={`/recipe/${item._id}`}>{item.title}</Link>
      </div>
    </div>
  );
}
