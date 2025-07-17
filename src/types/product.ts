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
