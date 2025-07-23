import dayjs from 'dayjs';

function getTime(day = 0, second = 0) {
  return dayjs()
    .add(day, 'days')
    .add(second, 'seconds')
    .format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'admin@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '무지',
        phone: '01011112222',
        address: '서울시 강남구 역삼동 123',
        type: 'admin',
        loginType: 'email',
        image: `files/${clientId}/user-muzi.png`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: '03-23',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's1@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '네오',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's1@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '테스트',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
        },
      },
    ],

    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 1990,
        shippingFees: 0,
        show: true,
        active: true,
        name: '바니바니바니바니 당근당근',
        quantity: 320,
        buyQuantity: 310,
        mainImages: [
          {
            path: `files/${clientId}/product-1.jpeg`,
            name: 'product-1.jpeg',
            originalname: 'product-1.jpeg',
          },
        ],
        content: ``,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          isBest: true,
          category: ['PC03', 'PC0301'],
          sort: 1,
          details: '150g',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 2990,
        shippingFees: 0,
        show: true,
        active: true,
        name: '고구마 답답이',
        quantity: 200,
        buyQuantity: 198,
        mainImages: [
          {
            path: `files/${clientId}/product-2.jpeg`,
            name: 'product-2.jpeg',
            originalname: 'product-2.jpeg',
          },
        ],
        content: ``,
        createdAt: getTime(-38, -60 * 60 * 6),
        updatedAt: getTime(-33, -60 * 55),
        extra: {
          isBest: true,
          category: ['PC01', 'PC0103'],
          sort: 2,
          details: '500g',
        },
      },
    ],

    // 주문
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS020',
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: 'OS020',
            name: '테스트용 상품입니다.',
            image: {
              path: `files/${clientId}/sample-diver.jpg`,
              name: 'sample-diver.jpg',
              originalname: '헬로카봇.jpg',
            },
            quantity: 2,
            price: 34520,
            review_id: 3,
          },
        ],
        cost: {
          products: 34520,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 37020,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS010',
        products: [
          {
            _id: 3,
            seller_id: 2,
            state: 'OS010',
            name: '레고 클래식 라지 조립 박스 10698',
            image: {
              path: `files/${clientId}/sample-classic.jpg`,
              name: 'sample-classic.jpg',
              originalname: '레고 클래식.jpg',
            },
            quantity: 1,
            price: 48870,
          },
          {
            _id: 4,
            seller_id: 3,
            state: 'OS010',
            name: '레고 테크닉 42151 부가티 볼리드',
            image: {
              path: `files/${clientId}/sample-bugatti.png`,
              name: 'sample-bugatti.png',
              originalname: '부가티.png',
            },
            quantity: 2,
            price: 90000,
            review_id: 2,
          },
        ],
        cost: {
          products: 138840,
          shippingFees: 3500,
          discount: {
            products: 13880,
            shippingFees: 3500,
          },
          total: 124960,
        },
        address: {
          name: '집',
          value: '서울시 강남구 역삼동 123',
        },
        createdAt: getTime(-4, -60 * 60 * 22),
        updatedAt: getTime(-2, -60 * 60 * 12),
      },
    ],

    // 후기
    review: [],

    // 장바구니
    cart: [
      {
        _id: await nextSeq('cart'),
        user_id: 1,
        product_id: 1,
        quantity: 2,
        createdAt: getTime(-7, -60 * 30),
        updatedAt: getTime(-7, -60 * 30),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 1,
        product_id: 2,
        quantity: 1,
        createdAt: getTime(-4, -60 * 30),
        updatedAt: getTime(-3, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 1,
        product_id: 2,
        quantity: 1,
        createdAt: getTime(-4, -60 * 30),
        updatedAt: getTime(-3, -60 * 60 * 12),
      },
    ],

    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        user: {
          _id: 4,
          name: '제이지',
          image: `files/${clientId}/user-jayg.webp`,
        },
        type: 'product',
        target_id: 1,
        memo: '첫째 크리스마스 선물.',
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        user: {
          _id: 4,
          name: '제이지',
          image: `files/${clientId}/user-jayg.webp`,
        },
        type: 'product',
        target_id: 2,
        memo: '둘째 생일 선물',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        user: {
          _id: 4,
          name: '제이지',
          image: `files/${clientId}/user-jayg.webp`,
        },
        type: 'post',
        target_id: 1,
        memo: '크기 문의글 북마크',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
    ],

    // 코드
    code: [],

    // 설정
    config: [],
  };
};
