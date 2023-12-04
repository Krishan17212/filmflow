import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css'

const Img = ({src, className, alt}) => {
  return (
    <LazyLoadImage className={className || "" }
    alt={alt}
    effect="blur"
    src={src}
    style={{width: "100%"}} />
  )
}

export default Img
