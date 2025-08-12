import { Link } from 'react-router';
function Header() {
  return (
    <div className="flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/board">Board</Link>
      {/* <Link to="/login">Login</Link> */}
    </div>
  );
}

export default Header;
