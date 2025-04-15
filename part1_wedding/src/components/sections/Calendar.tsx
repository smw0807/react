import { memo } from 'react'
import classNames from 'classnames/bind'
import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'

import Section from '@shared/Section'

import style from './Calendar.module.scss'
import 'react-day-picker/dist/style.css'

const cx = classNames.bind(style)

const css = `
  .rdp-month_caption {
    display: none;
  }
  .rdp-cell {
    cursor: default;
  }
  .rdp-head_cell {
    font-weight: 500;
    font-size: 14px;
  }
`
function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)
  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('wrap-calendar')}>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
          hideNavigation
        />
      </div>
    </Section>
  )
}

export default memo(Calendar)
