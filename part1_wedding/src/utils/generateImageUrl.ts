function generateImageUrl({
  filename,
  format,
  option = 'q_auto, c_fill',
}: {
  filename: string
  format: 'jpg' | 'webp'
  option?: string
}) {
  return `https://res.cloudinary.com/dqslnz2zd/image/upload/${option}/v1744555533/${format}/${filename}.${format}`
}

export default generateImageUrl
