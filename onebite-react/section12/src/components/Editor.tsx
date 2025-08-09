import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';

const emotionList = [
  {
    emotionId: 1,
    emotionName: '완전 좋음',
  },
  {
    emotionId: 2,
    emotionName: '좋음',
  },

  {
    emotionId: 3,
    emotionName: '그럭저럭',
  },
  {
    emotionId: 4,
    emotionName: '나쁨',
  },
  {
    emotionId: 5,
    emotionName: '끔찍함',
  },
];
function Editor() {
  const emotionId = 5;
  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날싸</h4>
        <input type="date" />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              emotionId={item.emotionId}
              emotionName={item.emotionName}
              isSelected={emotionId === item.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea placeholder="오늘 하루는 어땠나요?" />
      </section>
      <section className="button_section">
        <Button text="취소하기" onClick={() => {}} />
        <Button text="작성완료" type="POSITIVE" onClick={() => {}} />
      </section>
    </div>
  );
}

export default Editor;
