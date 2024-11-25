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

  const [modal, setModal] = useState(false);

  const [modalTitle, setModalTitle] = useState('');
  const modalChange = (title) => {
    setModalTitle(title);
    setModal(!modal);
  };

  const list = [];
  for (let i = 0; i < title.length; i++) {
    list.push(
      <div className="list" key={i}>
        <h4>
          <span onClick={() => modalChange(title[i])}>{title[i]}</span>
          <span onClick={() => likeUp(i)}>👍</span>
          {like[i]}
        </h4>
        <p>2024년 11월 20일 발행</p>
      </div>
    );
  }
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
      <button
        onClick={() => {
          const newTitle = [...title];
          newTitle.sort();
          setTitle(newTitle);
        }}
      >
        가나다순정렬
      </button>

      {list}

      {modal ? <Modal title={modalTitle} /> : null}
    </div>
  );
}

function Modal(props) {
  const [title, setTitle] = useState(props.title);

  return (
    <div className="modal">
      <h4>{title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => setTitle('여자 코트 추천')}>글 수정</button>
    </div>
  );
}
export default App;
