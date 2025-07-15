'use client';
import Image from 'next/image';
export default function RecipeList() {
  interface Recipe {
    author: string;
    ingredients: string;
    title: string;
    img: string;
  }

  const recipeArr: Recipe[] = [
    {
      author: 'oneway',
      ingredients: '당근',
      title: '사과 올린 샌드위치',
      img: '/imgs/recipe/recipe1.png',
    },
    {
      author: 'oneway',
      ingredients: '가지',
      title: '가지 올린 샌드위치',
      img: '/imgs/recipe/recipe2.png',
    },
    {
      author: 'oneway',
      ingredients: '고추',
      title: '고추 올린 샌드위치',
      img: '/imgs/recipe/recipe3.png',
    },
    {
      author: 'oneway',
      ingredients: '배추',
      title: '배추 올린 샌드위치',
      img: '/imgs/recipe/recipe4.png',
    },
    {
      author: 'oneway',
      ingredients: '양배추',
      title: '양배추 올린 샌드위치',
      img: '/imgs/recipe/recipe5.png',
    },
    {
      author: 'oneway',
      ingredients: '아스파라거스',
      title: '아스파라거스 올린 샌드위치인데 우동을 곁들인',
      img: '/imgs/recipe/recipe6.png',
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl mx-auto">
        {recipeArr.map((item, index) => {
          return (
            <div
              key={index}
              className={`w-[15rem] ${
                index >= 4 ? 'mt-[60px]' : index >= 0 ? 'mt-[25px]' : ''
              }`}
            >
              <figure className="lg:w-[15rem] lg:h-[19.375rem]">
                <div className="relative w-[15rem] h-[15rem]">
                  <Image
                    src={item.img}
                    alt="레시피 이미지"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <figcaption className="mt-[12px]">
                  <div className="relative flex">
                    <span className="text-xl font-semibold max-w-[90%]">
                      {item.title}
                    </span>
                    <Image
                      src="/imgs/ico-bookmark.png"
                      alt="북마크"
                      width={15}
                      height={20}
                      className="absolute right-0 top-1"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange text-sm">
                      {item.ingredients}
                    </span>
                    <span className="text-gray">{item.author}</span>
                  </div>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </>
  );
}
