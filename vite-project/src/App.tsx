import { useRoutes } from 'react-router-dom';
import './App.css';
import { routes } from './routes';

function App() {
  const elem = useRoutes(routes);
  return elem;
}
export default App;
