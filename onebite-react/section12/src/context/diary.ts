import type { Diary } from '@/models';
import { createContext } from 'react';

export const DiaryStateContext = createContext<Diary[]>([]);
export const DiaryDispatchContext = createContext<{
  onCreate: (createdDate: number, emotionId: number, content: string) => void;
  onUpdate: (
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
  ) => void;
  onDelete: (id: number) => void;
}>({
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
});
