import classNames from 'classnames/bind'
import style from './ImageGallery.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(style)

function ImageGallery({ images }: { images: string[] }) {
  return (
    <Section title="사진첩">
      <ul className={cx('wrap-images')}>
        {images.map((src, idx) => (
          <li key={idx} className={cx('wrap-image')}>
            <img src={src} alt="청첩장 사진" />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default ImageGallery
