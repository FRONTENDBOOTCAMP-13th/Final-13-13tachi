import { create } from 'zustand';

interface BookmarkState {
  likeMap: Map<number, number>;
  addBookmark: (postId: number, bookmarkId: number) => void;
  removeBookmark: (postId: number) => void;
  setLikeMap: (map: Map<number, number>) => void; // 초기 데이터 세팅용
}

const useBookmarkStore = create<BookmarkState>((set) => ({
  likeMap: new Map(),
  addBookmark: (postId, bookmarkId) =>
    set((state) => {
      const newMap = new Map(state.likeMap);
      newMap.set(postId, bookmarkId);
      return { likeMap: newMap };
    }),
  removeBookmark: (postId) =>
    set((state) => {
      const newMap = new Map(state.likeMap);
      newMap.delete(postId);
      return { likeMap: newMap };
    }),
  setLikeMap: (map) => set(() => ({ likeMap: map })),
}));

export default useBookmarkStore;
