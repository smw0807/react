import Image from 'next/image'

function ImagePage() {
  return (
    <div>
      <Image src="/images/logo.png" alt="logo" width={200} height={200} />
    </div>
  )
}
export default ImagePage
