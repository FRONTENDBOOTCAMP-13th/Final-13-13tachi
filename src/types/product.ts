// 상품
export interface ProductType {
  _id: number;
  price: number;
  name: string;
  quantity: number;
}

// 장바구니 리스트
export interface CartItemType {
  _id: number;
  product_id: number;
  quantity: number;
  product: ProductType;
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
  product: ProductType;
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
  products: ProductType[];
}

// 주문내역 리스트
export interface BuyItemListType {
  _id: number;
  createdAt: string;
  products: ProductType[];
}

// 주문내역 아이템
export interface BuyItemProps {
  _id: number;
  quantity: number;
  name: string;
  price: number;
}
