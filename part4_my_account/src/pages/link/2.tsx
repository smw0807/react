import Link from 'next/link'

function Link2Page() {
  return (
    <div>
      <Link href="/link/3" prefetch={false}>
        Link3
      </Link>
    </div>
  )
}
export default Link2Page
