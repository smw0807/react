import { Swiper, SwiperSlide } from 'swiper/react'

import classNames from 'classnames/bind'
import style from './ImageViewer.module.scss'

import Dimmed from '@shared/Dimmed'

import 'swiper/css'
import './swiper.css'

const cx = classNames.bind(style)

function ImageViewer({
  images,
  open = false,
  selectedIdx = 0,
  onClose,
}: {
  images: string[]
  open: boolean
  selectedIdx: number
  onClose: () => void
}) {
  if (!open) return null
  return (
    <Dimmed>
      <CloseButton className={cx('icon-close')} onClose={onClose} />
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        initialSlide={selectedIdx}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <picture>
              <source srcSet={`${src}.webp`} type="image/webp" />
              <img src={`${src}.jpg`} alt="청첩장 사진" />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </Dimmed>
  )
}

function CloseButton({
  onClose,
  className,
}: {
  onClose: () => void
  className: string
}) {
  return (
    <svg
      className={className}
      onClick={onClose}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
      </g>
    </svg>
  )
}
export default ImageViewer
