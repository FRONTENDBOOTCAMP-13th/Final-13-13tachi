import MyRecipeList from '@/app/mypage/recipe/myRecipe/MyRecipeList';

export default async function MyRecipe() {
  return (
    <div className="flex flex-col justify-between lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <MyRecipeList />
    </div>
  );
}
