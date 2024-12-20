import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [name, setName] = useState('');
  useEffect(() => {
    axios.get('/username.json').then((res) => {
      console.log(res.data);
      setName(res.data.name);
    });
  }, []);
  return [name];
}
