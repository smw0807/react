interface ButtonProps {
  text: string;
  color?: string;
  a?: number;
  b?: number;
  children?: React.ReactNode;
}
export default function Button({
  text,
  color = 'black',
  children,
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    console.log(text);
  };
  return (
    <button
      style={{ color }}
      onClick={handleClick}
      // onMouseEnter={handleClick}
    >
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
}
