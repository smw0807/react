import './DiaryItem.css';
import { useNavigate } from 'react-router-dom';
import { getEmotionImage } from '../utils/get-emotion-image';
import { getStringedDate } from '../utils/get-stringed-date';
import Button from './Button';
import type { Diary } from '../models';

function DiaryItem({ id, emotionId, content, createdDate }: Diary) {
  const navigate = useNavigate();
  return (
    <div className="DiaryItem">
      <div
        onClick={() => navigate(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId) as string} alt="emotion" />
      </div>
      <div onClick={() => navigate(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {getStringedDate(new Date(createdDate))}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button text="수정하기" onClick={() => navigate(`/edit/${id}`)} />
      </div>
    </div>
  );
}

export default DiaryItem;
