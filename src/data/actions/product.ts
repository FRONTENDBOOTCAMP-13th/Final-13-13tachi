'use server';

import {
  ApiRes,
  ApiResPromise,
  FileUpload,
  LikeItemType,
  ProductType,
} from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 상품 좋아요 추가
export async function productAddLike(
  state: ApiRes<LikeItemType> | null,
  formData: FormData,
): ApiResPromise<LikeItemType> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<LikeItemType>;

  const body = {
    target_id: Number(formData.get('_id')),
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`bookmarks`);
    revalidateTag(`/shopping/${_id}`);
    revalidateTag(`/shopping`);
  }

  return data;
}

// 상품 좋아요 삭제
export async function productDeleteLike(
  state: ApiRes<LikeItemType> | null,
  formData: FormData,
): ApiResPromise<LikeItemType> {
  const like_id = formData.get('like_id'); // 북마크의 id
  const _id = formData.get('_id'); // 상품의 id
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<LikeItemType>;

  const body = {
    target_id: Number(formData.get('_id')),
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/${like_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`bookmarks`);
    revalidateTag(`/shopping/${_id}`);
    revalidateTag(`/shopping`);
  }

  return data;
}

/**
 * 상품 좋아요 삭제 (마이페이지용)
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function deleteLike(
  state: ApiRes<LikeItemType> | null,
  formData: FormData,
): ApiResPromise<LikeItemType> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<LikeItemType>;

  const body = {
    target_id: 'any',
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  if (data.ok) {
    revalidateTag(`bookmarks`);
    revalidatePath(`/mypage/wish`);
  }

  return data;
}

export async function deleteLikeInWish(
  _id: number,
  accessToken: string,
): ApiResPromise<LikeItemType> {
  let res: Response;
  let data: ApiRes<LikeItemType>;

  const body = {
    target_id: 'any',
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  if (data.ok) {
    revalidateTag(`bookmarks`);
    revalidatePath(`/mypage/wish`);
  }

  return data;
}

// 판매자 상품 관리

// 판매자 상품 삭제
export async function deleteProduct(
  state: ApiRes<ProductType> | null,
  formData: FormData,
): ApiResPromise<ProductType> {
  let res: Response;
  let data: ApiRes<ProductType>;

  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');
  const body = {
    _id,
  };

  try {
    res = await fetch(`${API_URL}/seller/products/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  if (data.ok) {
    revalidatePath(`/mypage/product`);
  }

  return data;
}

// 판매자 상품 등록
export async function registProduct(
  state: ApiRes<ProductType> | null,
  formData: FormData,
): ApiResPromise<ProductType> {
  let res: Response;
  let data: ApiRes<ProductType>;

  const seller_id = formData.get('seller_id');
  const price = Number(formData.get('price'));
  const quantity = Number(formData.get('quantity'));
  const name = formData.get('name');
  const content = formData.getAll('info');
  const category = formData.getAll('category');
  const details = formData.get('details');
  const infoString = formData.get('info') as string | null;
  let infoArray: string[] = [];
  if (infoString) {
    infoArray = infoString.split(/\./);
  }
  const storage = formData.getAll('storage');
  const show = true;
  const accessToken = formData.get('accessToken');

  const extra = {
    category: category,
    details: details,
    info: infoArray,
    storage: storage,
  };

  try {
    // 첨부파일(프로필 이미지) 처리
    const attach = formData.get('attach') as File;
    let mainImages: { path: string; name: string; originalname: string }[] = [];
    if (attach.size > 0) {
      // 파일 업로드 API 호출
      const fileRes = await uploadFile(formData);
      console.log(`fileRes`, fileRes);
      if (fileRes.ok) {
        mainImages = fileRes.item.map(file => ({
          path: file.path,
          name: file.name,
          originalname: file.name,
        }));
      } else {
        return fileRes;
      }
    }

    const body = {
      seller_id,
      price,
      quantity,
      name,
      content,
      category,
      extra,
      show,
      ...(mainImages ? { mainImages } : {}),
    };
    console.log(body);

    res = await fetch(`${API_URL}/seller/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  if (data.ok) {
    console.log(data.item);
    revalidatePath(`/mypage/product`);
    redirect(`/mypage/product`);
  }

  return data;
}
// 판매자 상품 수정
export async function modifyProduct(
  state: ApiRes<ProductType> | null,
  formData: FormData,
): ApiResPromise<ProductType> {
  let res: Response;
  let data: ApiRes<ProductType>;
  const _id = formData.get('_id');

  const seller_id = Number(formData.get('seller_id'));
  const price = Number(formData.get('price'));
  const quantity = Number(formData.get('quantity'));
  const name = formData.get('name');
  const content = formData.getAll('info');
  const category = formData.getAll('category');
  const details = formData.get('details');
  const infoString = formData.get('info') as string | null;
  let infoArray: string[] = [];
  if (infoString) {
    infoArray = infoString
      .split(/\./)
      .filter(part => part !== '')
      .map(part => part + '.');
  }
  const storage = formData.getAll('storage');
  const show = true;
  const accessToken = formData.get('accessToken');

  const extra = {
    category: category,
    details: details,
    info: infoArray,
    storage: storage,
  };

  try {
    // 첨부파일(프로필 이미지) 처리
    const attach = formData.get('attach') as File;
    let mainImages: { path: string; name: string; originalname: string }[] = [];
    if (attach.size > 0) {
      // 파일 업로드 API 호출
      const fileRes = await uploadFile(formData);
      console.log(`fileRes`, fileRes);
      if (fileRes.ok) {
        mainImages = fileRes.item.map(file => ({
          path: file.path,
          name: file.name,
          originalname: file.name,
        }));
      } else {
        return fileRes;
      }
    }

    const body = {
      seller_id,
      price,
      quantity,
      name,
      content,
      category,
      extra,
      show,
      ...(mainImages.length > 0 ? { mainImages } : {}),
    };
    console.log(body);

    res = await fetch(`${API_URL}/seller/products/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
  if (data.ok) {
    console.log(data.item);
    revalidatePath(`/mypage/product`);
    redirect(`/mypage/product`);
  }

  return data;
}

/**
 * 파일 업로드 함수
 * @param formData - 업로드할 파일이 담긴 FormData 객체
 * @returns 파일 업로드 결과를 반환하는 Promise
 * @description
 * 파일을 서버에 업로드하고, 업로드된 파일 정보를 반환합니다.
 */
export async function uploadFile(
  formData: FormData,
): ApiResPromise<FileUpload[]> {
  // 새로운 FormData 객체 생성 후 파일 추가
  const fileForm = new FormData();
  fileForm.append('attach', formData.get('attach') as File);

  // API 서버에 파일 업로드 요청
  const res = await fetch(`${API_URL}/files`, {
    method: 'POST',
    headers: {
      'Client-Id': CLIENT_ID,
    },
    body: fileForm,
  });
  // 서버에서 반환된 JSON 결과 반환
  return res.json();
}
