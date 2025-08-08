import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  return <div>Edit {id}번 일기입니다.</div>;
}
export default Edit;
