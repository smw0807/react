import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

function Home() {
  return (
    <div>
      <Header
        title="Header"
        leftChild={
          <Button
            text="<"
            onClick={() => {
              console.log('<<<');
            }}
          />
        }
        rightChild={
          <Button
            text=">"
            onClick={() => {
              console.log('>>>');
            }}
          />
        }
      />
      <DiaryList />
    </div>
  );
}

export default Home;
