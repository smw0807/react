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

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'red', fontSize: '20px' }}>{logo}</h4>
      </div>
      <div className="list">
        <h4>{title[0]}</h4>
        <p>2024년 11월 20일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>2024년 11월 20일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>2024년 11월 20일 발행</p>
      </div>
    </div>
  );
}

export default App;
