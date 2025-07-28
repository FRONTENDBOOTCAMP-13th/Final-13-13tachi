import { create } from 'zustand';

interface CounterState {
  count: number;
  countDown: (step: number) => void;
  countUp: (step: number) => void;
}

const useCounterStore = create<CounterState>(set => ({
  // 상태값 초기화
  count: 1,
  countDown: step => set(state => ({ count: Math.max(1, state.count - step) })),
  countUp: step => set(state => ({ count: state.count + step })),
}));

export default useCounterStore;
