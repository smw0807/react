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
  return (
    <button style={{ color }}>
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
}
