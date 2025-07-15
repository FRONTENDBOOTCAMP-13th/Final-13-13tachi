interface ShoppingItems {
  author: string;
  ingredients: string;
  title: string;
  img: string;
}

const shoppingArr: ShoppingItems[] = [
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

export default function ShoppingHotItem() {
  console.log(shoppingArr);
  return <>장보기 인기 리스트</>;
}
