import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../context/diary';
import usePageTitle from '../hooks/usePageTitle';

import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import type { Diary } from '../models';

function New() {
  usePageTitle('새 일기 쓰기');
  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);
  const onSubmit = (input: Diary) => {
    const createdDate =
      input.createdDate instanceof Date
        ? input.createdDate.getTime()
        : input.createdDate;
    onCreate(createdDate, input.emotionId, input.content);
    navigate('/', { replace: true });
  };

  return (
    <div>
      <Header
        title="새 일 쓰기"
        leftChild={<Button text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
}

export default New;
