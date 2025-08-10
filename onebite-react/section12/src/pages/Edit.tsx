import { useContext } from 'react';
import { DiaryDispatchContext } from '../context/diary';
import { useParams, useNavigate } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import type { Diary } from '../models';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const { currentDiaryItem } = useDiary(id as string);

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
      onDelete(Number(id));
      navigate('/', { replace: true });
    }
  };

  const onSubmit = (input: Diary) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      onUpdate(
        Number(id),
        new Date(input.createdDate).getTime(),
        input.emotionId,
        input.content
      );
      navigate('/', { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
        rightChild={
          <Button text={'삭제하기'} type="NEGATIVE" onClick={onClickDelete} />
        }
      />
      <Editor initData={currentDiaryItem as Diary} onSubmit={onSubmit} />
    </div>
  );
}
export default Edit;
