import { useState } from 'react';

import { useContext } from 'react';
import { DiaryStateContext } from '../context/diary';

import type { Diary } from '../models';

import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import usePageTitle from '../hooks/usePageTitle';

const getMonthlyData = (diaryList: Diary[], pivotDate: Date) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  const monthlyData = diaryList.filter((item) => {
    const itemDate = new Date(item.createdDate);
    return itemDate.getTime() >= beginTime && itemDate.getTime() <= endTime;
  });

  return monthlyData;
};
function Home() {
  usePageTitle('감정 일기장');
  const diaryList = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyData(diaryList, pivotDate);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.setMonth(pivotDate.getMonth() + 1)));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.setMonth(pivotDate.getMonth() - 1)));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text="<" onClick={onDecreaseMonth} />}
        rightChild={<Button text=">" onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
}

export default Home;
