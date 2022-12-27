import Image from 'next/image'
import styles from './ImageDisplay.module.css'
type Props = {
  fileId: string
}

const ImageDisplay: React.FC<Props> = ({ fileId }) => {
  return (
    <figure className={styles.figure_container}>
      <Image
        src={`https://drive.google.com/uc?export=view&id=${fileId}`}
        blurDataURL={`https://drive.google.com/uc?export=view&id=${fileId}`}
        placeholder='blur'
        referrerPolicy="no-referrer"
        alt='Image'
        quality={90}
        height={300}
        width={600}
        className={styles.figure_container__image}
      />
    </figure>
  )
}

export default ImageDisplay