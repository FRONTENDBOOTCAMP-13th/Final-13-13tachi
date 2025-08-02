import MyRecipeList from '@/app/mypage/recipe/myRecipe/MyRecipeList';

export default async function MyRecipe() {
  return (
    <div className="flex flex-col justify-between h-full">
      <MyRecipeList />
    </div>
  );
}
