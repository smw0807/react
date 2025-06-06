import classNames from 'classnames/bind'
import style from './Video.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(style)

function Video() {
  return (
    <Section className={cx('container')}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        poster="/assets/poster.jpg"
      >
        <source src="/assets/cut-Medium.webm" type="video/webm" />
        <source src="/assets/cut-Medium.mp4" type="video/mp4" />
      </video>
    </Section>
  )
}

export default Video
