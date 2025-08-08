import './App.css';
import { useReducer, useRef } from 'react';
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
  switch (action.type) {
    case 'CREATE':
      return [action.data as Diary, ...state];
    case 'UPDATE':
      return state.map((item: Diary) =>
        String(item.id) === String(action.data.id)
          ? (action.data as Diary)
          : item
      );
    case 'DELETE':
      return state.filter(
        (item: Diary) => String(item.id) !== String(action.data.id)
      );
  }
  return state;
}

const mockData: Diary[] = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: '오늘의 일기 1',
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 2,
    content: '오늘의 일기 2',
  },
];

function App() {
  const idRef = useRef(3);
  const [data, dispatch] = useReducer(reducer, mockData);

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
