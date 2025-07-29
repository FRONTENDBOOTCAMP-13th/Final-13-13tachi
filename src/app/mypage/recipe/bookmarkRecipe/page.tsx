import BookmarkRecipeList from '@/app/mypage/recipe/bookmarkRecipe/BookmarkRecipeList';

export default function BookmarkRecipe() {
  return (
    <div className="flex flex-col justify-between lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <BookmarkRecipeList />
    </div>
  );
}
