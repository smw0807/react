import classNames from 'classnames/bind'
import style from './Section.module.scss'

const cx = classNames.bind(style)

function Section({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: string
}) {
  return (
    <section className={cx(['container', className])}>
      {title && <div className={cx('txt-title')}>{title}</div>}
      {children}
    </section>
  )
}

export default Section
