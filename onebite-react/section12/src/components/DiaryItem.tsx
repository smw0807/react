import './DiaryItem.css';
import { getEmotionImage } from '../utils/get-emotion-image';
import Button from './Button';
function DiaryItem() {
  const emotionId = 1;

  return (
    <div className="DiaryItem">
      <div className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId) as string} alt="emotion" />
      </div>
      <div className="info_section">
        <div className="created_date">{new Date().toLocaleDateString()}</div>
        <div className="content">일기 컨텐츠</div>
      </div>
      <div className="button_section">
        <Button text="수정하기" onClick={() => {}} />
      </div>
    </div>
  );
}

export default DiaryItem;
