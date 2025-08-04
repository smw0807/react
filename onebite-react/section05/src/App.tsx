import './App.css';
import Button from './components/Button';
import Header from './components/Header';

function App() {
  const buttonProps = {
    text: '메일',
    color: 'red',
    a: 1,
    b: 2,
  };
  return (
    <>
      <Button {...buttonProps} />
      <Button text={'카페'} />
      <Button text={'블로그'}>
        <Header />
      </Button>
    </>
  );
}

export default App;
