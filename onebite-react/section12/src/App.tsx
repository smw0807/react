import './App.css';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewPage from './pages/New';
import DiaryPage from './pages/Diary';
import EditPage from './pages/Edit';
import NotFoundPage from './pages/NotFount';

import { DiaryStateContext, DiaryDispatchContext } from './context/diary';

import type { Diary } from './models';

function reducer(
  state: Diary[],
  action: { type: string; data: Partial<Diary> }
) {
  let nextState;
  switch (action.type) {
    case 'INIT':
      return action.data as Diary[];
    case 'CREATE':
      nextState = [action.data as Diary, ...state];
      break;
    case 'UPDATE':
      nextState = state.map((item: Diary) =>
        String(item.id) === String(action.data.id)
          ? (action.data as Diary)
          : item
      );
      break;
    case 'DELETE':
      nextState = state.filter(
        (item: Diary) => String(item.id) !== String(action.data.id)
      );
      break;
    default:
      nextState = state;
  }
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storeData = localStorage.getItem('diary');
    if (!storeData) {
      setIsLoading(false);
      return;
    }

    const parseData = JSON.parse(storeData);
    if (!Array.isArray(parseData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parseData.forEach((item: Diary) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;
    dispatch({
      type: 'INIT',
      data: parseData as Partial<Diary>,
    });
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (
    createdDate: number,
    emotionId: number,
    content: string
  ) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
  ) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id: number) => {
    dispatch({
      type: 'DELETE',
      data: {
        id,
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/diary/:id" element={<DiaryPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
