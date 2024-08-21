import './App.css';

function App() {
  let post = '강남 고기 맛집';
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'red', fontSize: '20px' }}>블로그임</h4>
      </div>
      <h4>블로그 글 제목</h4>
      <div> {post} </div>
    </div>
  );
}

export default App;
