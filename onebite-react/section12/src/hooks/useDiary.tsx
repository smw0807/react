import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../context/diary';
import type { Diary } from '../models';
function useDiary(id: string) {
  const navigate = useNavigate();
  const data = useContext(DiaryStateContext);
  const [currentDiaryItem, setCurrentDiaryItem] = useState<Diary>();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      navigate('/', { replace: true });
    }
    setCurrentDiaryItem(currentDiaryItem);
  }, [id]);

  return { currentDiaryItem };
}

export default useDiary;
