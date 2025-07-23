// 상품
export interface ProductType {
  _id: number;
  price: number;
  name: string;
}

// 장바구니
export interface CartItemType {
  _id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ApiCartItem {
  _id: number;
  product_id: number;
  quantity: number;
  product: ProductType;
}

// 찜상품
export interface LikeItemType {
  _id: number;
  price: number;
  name: string;
  shippingFees: number;
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
