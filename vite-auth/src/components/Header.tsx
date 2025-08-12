import { Link } from 'react-router';
import useToken from '../hooks/useToken';
function Header() {
  const { getToken, handleLogout } = useToken();

  const userMenu = () => {
    const accessToken = getToken('access');
    if (accessToken) {
      return (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    }
    return <Link to="/login">Login</Link>;
  };
  return (
    <div className="flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/board">Board</Link>
      {userMenu()}
    </div>
  );
}

export default Header;
