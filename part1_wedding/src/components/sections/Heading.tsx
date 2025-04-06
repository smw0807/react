import classNames from 'classnames/bind'
import style from './Heading.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(style)

function Heading() {
  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>25.04.06</div>
      <div className={cx('txt-day')}>SUNDAY</div>
    </Section>
  )
}

export default Heading
