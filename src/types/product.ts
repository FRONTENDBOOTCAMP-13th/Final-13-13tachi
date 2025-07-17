// 상품
export interface ProductType {
  _id: number;
  price: number;
  name: string;
  shippingFees: number;
}

// 장바구니
export interface CartItemType {
  _id: number;
  price: number;
  name: string;
  shippingFees: number;
}

// 찜상품
export interface LikeItemType {
  _id: number;
  price: number;
  name: string;
  shippingFees: number;
}
