import { useParams } from 'react-router-dom';
function Diary() {
  const { id } = useParams();
  console.log('id: ', id);
  return <div>Diary</div>;
}

export default Diary;
