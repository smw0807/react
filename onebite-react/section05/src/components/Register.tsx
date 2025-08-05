import { useState } from 'react';
export default function Register() {
  const [input, setInput] = useState({
    name: '',
    birth: '',
    country: 'kr',
    bio: '',
  });

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  return (
    <div>
      <div>
        <input
          onChange={onChangeHandler}
          name="name"
          value={input.name}
          placeholder="이름"
        />
      </div>

      <div>
        <input
          type="date"
          onChange={onChangeHandler}
          value={input.birth}
          name="birth"
        />
      </div>

      <div>
        <select onChange={onChangeHandler} value={input.country} name="country">
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="jp">일본</option>
        </select>
      </div>

      <div>
        <textarea onChange={onChangeHandler} value={input.bio} name="bio" />
      </div>
    </div>
  );
}
