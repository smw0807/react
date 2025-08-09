import './EmotionItem.css';

import { getEmotionImage } from '../utils/get-emotion-image';

function EmotionItem({
  emotionId,
  emotionName,
  isSelected,
}: {
  emotionId: number;
  emotionName: string;
  isSelected: boolean;
}) {
  return (
    <div
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ''
      }`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId) || ''} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
}

export default EmotionItem;
