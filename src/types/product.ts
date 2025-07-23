// 상품
export interface ProductType {
  _id?: number;
  seller_id?: number;
  price?: number;
  name?: string;
  mainImages?: {
    path: string;
    name?: string;
    originalname?: string;
  }[];
  extra?: {
    category?: string[];
    sort?: number;
    details?: string;
  };
}

// 상품 가져오기용 리스트
export interface ProductItemType {
  _id: number;
  price: number;
  name: string;
  mainImages?: {
    path: string;
    name?: string;
    originalname?: string;
  }[];
  quantity: number;
}

// 장바구니 리스트
export interface CartItemType {
  _id: number;
  product_id: number;
  quantity: number;
  product: ProductItemType;
}

// 장바구니 아이템
export interface CartListProps {
  _id: number;
  quantity: number;
  name: string;
  price: number;
}

// 찜상품 리스트
export interface LikeItemType {
  _id: number;
  target_id: number;
  product: ProductItemType;
}

// 찜상품
export interface LikeItemProps {
  _id: number;
  price: number;
  name: string;
}

// 주문내역 리스트
export interface BuyListType {
  _id: number;
  createdAt: string;
  products: ProductItemType[];
}

// 주문내역 리스트
export interface BuyItemListType {
  _id: number;
  createdAt: string;
  products: ProductItemType[];
}

// 주문내역 아이템
export interface BuyItemProps {
  _id: number;
  quantity: number;
  name: string;
  price: number;
}

export interface Recipe {
  _id?: string;
  author: string;
  ingredients: string;
  title: string;
  img: string;
  category: '채소' | '과일' | '나의레시피';
  createdAt?: string;
}
