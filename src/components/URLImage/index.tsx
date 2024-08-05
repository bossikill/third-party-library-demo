import { useEffect, useState } from 'react'
import { Image } from 'react-konva'

export default function URLImage(props: any) {
  const [image, setImage] = useState(null)
  let newImage = null

  useEffect(() => {
    loadImage()
    return () => {
      newImage.removeEventListener('load', handleLoad)
    }
  }, [])

  const loadImage = () => {
    newImage = new window.Image()
    newImage.src = props.src
    newImage.addEventListener('load', handleLoad)
  }

  const handleLoad = () => {
    setImage(newImage)
  }

  return <Image x={props.x} y={props.y} image={image} />
}
