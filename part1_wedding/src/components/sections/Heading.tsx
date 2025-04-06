import { parseISO, format } from 'date-fns'
import classNames from 'classnames/bind'
import style from './Heading.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(style)

function Heading({ date }: { date: string }) {
  const weddingDate = parseISO(date)
  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>
        {format(weddingDate, 'EEEE').toUpperCase()}
      </div>
    </Section>
  )
}

export default Heading
