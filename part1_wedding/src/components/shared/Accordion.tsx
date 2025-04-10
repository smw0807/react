import { PropsWithChildren, useState } from 'react'
import classNames from 'classnames/bind'

import style from './Accordion.module.scss'

const cx = classNames.bind(style)

//<Accordion label="label">content</Accordion>
interface AccordionProps {
  label: string
}
function Accordion({ label, children }: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }
  return (
    <div
      className={cx(['wrap-accordion', expanded ? 'open' : ''])}
      onClick={handleToggle}
    >
      <div className={cx('wrap-header')}>
        <span>{label}</span>
        <IconArrowDown className={cx('ico-arrow-down')} />
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}

function IconArrowDown({ className }: { className: string }) {
  return (
    <svg
      className={className}
      height="512px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="512px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
    </svg>
  )
}
export default Accordion
