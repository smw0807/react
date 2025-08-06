import { useState, useRef } from 'react';
import './Editor.css';

interface EditorProps {
  onCreate: (content: string) => void;
}

export default function Editor({ onCreate }: EditorProps) {
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLInputElement>(null);
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (content.length === 0) {
      contentRef.current?.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <div className="Editor">
      <input
        placeholder="새로운 Todo..."
        value={content}
        onChange={onChangeContent}
        ref={contentRef}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
}
