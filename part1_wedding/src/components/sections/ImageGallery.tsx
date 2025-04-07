import { useState } from 'react'
import classNames from 'classnames/bind'
import style from './ImageGallery.module.scss'

import Section from '@shared/Section'
import ImageViewer from '@components/ImageViewer'

const cx = classNames.bind(style)

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const open = selectedIdx > -1

  const handleSelectedImage = (idx: number) => {
    setSelectedIdx(idx)
  }

  const handleClose = () => {
    setSelectedIdx(-1)
  }
  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, idx) => (
            <li
              onClick={() => {
                handleSelectedImage(idx)
              }}
              key={idx}
              className={cx('wrap-image')}
            >
              <img src={src} alt="청첩장 사진" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}

export default ImageGallery
