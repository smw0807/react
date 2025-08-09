import './Header.css';
interface Props {
  title: string;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
}
function Header({ title, leftChild, rightChild }: Props) {
  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightChild}</div>
    </header>
  );
}

export default Header;
