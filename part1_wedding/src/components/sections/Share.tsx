import { useEffect } from 'react'
import classNames from 'classnames/bind'
import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Section from '@shared/Section'

import styles from './Share.module.scss'

const cx = classNames.bind(styles)

declare global {
  interface Window {
    Kakao: any
  }
}
interface ShareProps {
  groomName: string
  brideName: string
  date: string
}

function Share({ groomName, brideName, date }: ShareProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      console.log(window)
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY)
      }
    }
  }, [])

  const handleShareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${groomName} ❤️ ${brideName} 결혼식합니다.`,
        description: `결혼식 날짜: ${format(parseISO(date), 'M월 d일 eeee, aaa h시', { locale: ko })}`,
        imageUrl:
          'https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/09/urbanbrush-20220922134835594912.jpg',
        link: {
          mobileWebUrl: window.location.origin,
          webUrl: window.location.origin,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    })
  }
  return (
    <Section title="공유하기">
      <div className={cx('wrap-share')}>
        <button onClick={handleShareKakao}>
          <IconKakao />
        </button>
        <CopyToClipboard
          text={window.location.origin}
          onCopy={() => {
            window.alert('복사가 되었습니다.')
          }}
        >
          <button>
            <IconClipboard />
          </button>
        </CopyToClipboard>
      </div>
    </Section>
  )
}

function IconKakao() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <title />
      <g
        data-name="kakao talk chat media social"
        id="kakao_talk_chat_media_social"
      >
        <path d="M29.88,13.06a1,1,0,0,0-1,1c0,5.42-5.78,9.83-12.88,9.83a15.91,15.91,0,0,1-2.19-.16,1,1,0,0,0-.89.34,13.88,13.88,0,0,1-4,3,8.32,8.32,0,0,0,.71-3.91,1,1,0,0,0-.56-.81c-3.75-1.83-6-4.92-6-8.28C3.12,8.63,8.9,4.22,16,4.22A14.15,14.15,0,0,1,26.87,8.79,1,1,0,1,0,28.4,7.5C25.64,4.2,21,2.22,16,2.22,7.79,2.22,1.12,7.53,1.12,14.06c0,4,2.44,7.6,6.56,9.8a8.82,8.82,0,0,1-1.29,3.91A.85.85,0,0,0,6.3,28a1.39,1.39,0,0,0,.54,1.52,1.35,1.35,0,0,0,1.52.07,18.49,18.49,0,0,0,5.72-3.8,18.71,18.71,0,0,0,1.92.11c8.21,0,14.88-5.31,14.88-11.83A1,1,0,0,0,29.88,13.06Z" />
        <path d="M10.79,17.62A1,1,0,0,0,12.08,17l1.06-2.76L14.21,17a1,1,0,0,0,.93.64,1.13,1.13,0,0,0,.36-.06,1,1,0,0,0,.58-1.3l-2-5.18a1,1,0,0,0-1.87,0l-2,5.18A1,1,0,0,0,10.79,17.62Z" />
        <path d="M17.51,10.5a1,1,0,0,0-1,1v5.18a1,1,0,0,0,1,1h2.56a1,1,0,0,0,0-2H18.51V11.5A1,1,0,0,0,17.51,10.5Z" />
        <path d="M8.46,17.68a1,1,0,0,0,1-1V12.5h.75a1,1,0,0,0,0-2H6.71a1,1,0,0,0,0,2h.75v4.18A1,1,0,0,0,8.46,17.68Z" />
        <path d="M22.46,10.5a1,1,0,0,0-1,1v5.18a1,1,0,0,0,2,0v-1.2L25,17.32a1,1,0,0,0,.77.36A1,1,0,0,0,26.53,16l-2-2.34,1.8-1.41a1,1,0,0,0-1.23-1.58L23.46,12V11.5A1,1,0,0,0,22.46,10.5Z" />
      </g>
    </svg>
  )
}
function IconClipboard() {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18,4 L19,4 C20.1045695,4 21,4.8954305 21,6 L21,21 C21,22.1045695 20.1045695,23 19,23 L5,23 C3.8954305,23 3,22.1045695 3,21 L3,6 C3,4.8954305 3.8954305,4 5,4 L6,4 C6,2.8954305 6.8954305,2 8,2 L8.99592076,2 C9.74819983,1.36297463 10.8391373,1 12,1 C13.1608627,1 14.2518002,1.36297463 15.0040792,2 L16,2 C17.1045695,2 18,2.8954305 18,4 Z M6.26756439,6 L5,6 L5,21 L19,21 L19,6 L17.7324356,6 C17.3866262,6.59780137 16.7402824,7 16,7 L8,7 C7.25971764,7 6.61337381,6.59780137 6.26756439,6 Z M10.1566481,3.65537749 L9.85761804,4 L9.40134659,4 L8,4 L8,5 L16,5 L16,4 L14.142382,4 L13.8433519,3.65537749 C13.5148073,3.27674041 12.8105871,3 12,3 C11.1894129,3 10.4851927,3.27674041 10.1566481,3.65537749 Z"
        fill-rule="evenodd"
      />
    </svg>
  )
}
export default Share
