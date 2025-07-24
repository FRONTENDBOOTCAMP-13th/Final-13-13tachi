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
    isBest?: boolean;
  };
}

// 상품 조회
export interface ProductTypeRes {
  ok: 0 | 1;
  item: ProductType;
}

// 상품 가져오기용 리스트
export interface ProductItemType {
  _id: number;
  price: number;
  name: string;
  image?: {
    path: string;
    name?: string;
    originalname?: string;
  };
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
  product: LikeItemProps;
}

// 찜상품 가져오기용 리스트
export interface LikeItemProps {
  _id: number;
  price: number;
  name: string;
  mainImages: {
    path: string;
    name?: string;
    originalname?: string;
  }[];
}

// 찜상품
// export interface LikeItemProps {
//   _id: number;
//   price: number;
//   name: string;
//   mainImages?: {
//     path: string;
//     name?: string;
//     originalname?: string;
//   };
// }

// 주문내역 리스트
export interface BuyListType {
  _id: number;
  createdAt: string;
  products: ProductItemType[];
}
// 주문상세
export interface OrderInfoType {
  _id: number;
  createdAt: string;
  address: {
    value: string;
  };
  cost: {
    total: number;
  };
  products: ProductItemType[];
}
// 주문 상세 아이템
export interface OrderInfoItemType {
  _id: number;
  createdAt: string;
  address: string;
  cost: number;
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
  _id: string;
  title: string;
  author: string;
  tag?: string;
  image: string | null;
  category: string;
}
