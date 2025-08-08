import './DiaryList.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import DiaryItem from './DiaryItem';
import type { Diary } from '../models';

function DiaryList({ data }: { data: Diary[] }) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<'latest' | 'oldest'>('latest');

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as 'latest' | 'oldest');
  };

  const sortedData = () => {
    return data.sort((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onSortTypeChange}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <Button
          text="새 일기 쓰기"
          type="POSITIVE"
          onClick={() => navigate('/new')}
        />
      </div>
      <div className="list_wrapper">
        {sortedData().map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default DiaryList;
