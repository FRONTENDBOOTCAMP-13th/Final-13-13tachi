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

// 장바구니
export interface CartItemType {
  _id: number;
  product_id: number;
  quantity: number;
  product: ProductType;
}

export interface CartListProps {
  _id: number;
  quantity: number;
  name: string;
  price: number;
}

// 찜상품
export interface LikeItemType {
  _id: number;
  price: number;
  name: string;
  shippingFees: number;
}
