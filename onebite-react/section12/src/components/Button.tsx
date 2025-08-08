import './Button.css';

interface Props {
  text: string;
  type?: 'POSITIVE' | 'NEGATIVE';
  onClick: () => void;
}
function Button({ text, type, onClick }: Props) {
  return (
    <button onClick={onClick} className={`Button Button_${type}`}>
      {text}
    </button>
  );
}

export default Button;
