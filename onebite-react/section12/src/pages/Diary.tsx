import { useParams, useNavigate } from 'react-router-dom';

import useDiary from '../hooks/useDiary';
import { getStringedDate } from '../utils/get-stringed-date';

import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer';

function Diary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentDiaryItem } = useDiary(id as string);

  if (!currentDiaryItem) {
    return <div>Loading...</div>;
  }

  const { createdDate, emotionId, content } = currentDiaryItem;

  return (
    <div>
      <Header
        title={`${getStringedDate(new Date(createdDate))} 기록`}
        leftChild={<Button text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
        rightChild={
          <Button text={'수정하기'} onClick={() => navigate(`/edit/${id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
}

export default Diary;
