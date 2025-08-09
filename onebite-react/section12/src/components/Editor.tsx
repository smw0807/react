import './Editor.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';
import Button from './Button';
import type { Diary } from '../models';

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
function Editor({ onSubmit }: { onSubmit: (input: Diary) => void }) {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });
  const getStringedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickEmotion = (emotionId: number) => {
    setInput({
      ...input,
      emotionId,
    });
  };

  const onClickSubmit = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날싸</h4>
        <input
          name="createdDate"
          type="date"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              emotionId={item.emotionId}
              emotionName={item.emotionName}
              isSelected={input.emotionId === item.emotionId}
              onClick={() => onClickEmotion(item.emotionId)}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘 하루는 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button text="취소하기" onClick={() => navigate(-1)} />
        <Button text="작성완료" type="POSITIVE" onClick={onClickSubmit} />
      </section>
    </div>
  );
}

export default Editor;
