import './App.css';
import { useState } from 'react';
function App() {
  // const [logo, setLogo] = useState('ReactBlog');
  const logo = 'ReactBlog';
  // 상태 변수 선언
  // 0: 변수명, 1: 변수 값 설정하는 함수
  const [title, setTitle] = useState([
    '남자 코트 추천',
    '강남 우동 맛집',
    '파이썬 공부',
  ]);
  const firstTitleChange = () => {
    setTitle(title.map((t, i) => (i === 0 ? '여자 코트 추천' : t)));
  };

  const [like, setLike] = useState([0, 0, 0]);
  const likeUp = (idx) => {
    const newLike = [...like];
    newLike[idx] = newLike[idx] + 1;
    setLike(newLike);
  };
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'red', fontSize: '20px' }}>{logo}</h4>
      </div>
      <button
        onClick={() => {
          firstTitleChange();
        }}
      >
        button
      </button>
      <div className="list">
        <h4>
          {title[0]}
          <span
            onClick={() => {
              likeUp(0);
            }}
          >
            👍
          </span>
          {like[0]}
        </h4>
        <p>2024년 11월 20일 발행</p>
      </div>
      <div className="list">
        <h4>
          {title[1]}
          <span
            onClick={() => {
              likeUp(1);
            }}
          >
            👍
          </span>
          {like[1]}
        </h4>
        <p>2024년 11월 20일 발행</p>
      </div>
      <div className="list">
        <h4>
          {title[2]}
          <span
            onClick={() => {
              likeUp(2);
            }}
          >
            👍
          </span>
          {like[2]}
        </h4>
        <p>2024년 11월 20일 발행</p>
      </div>
    </div>
  );
}

export default App;
