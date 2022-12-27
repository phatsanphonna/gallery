import Image from 'next/image'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import styles from './ImageCard.module.css'
import Link from 'next/link'
import moment from 'moment'

type Props = {
  id: string,
  fileId: string,
  location: string,
  dateTime: string | null
}

const ImageCard: React.FC<Props> = ({ id, fileId, location, dateTime }) => {
  const [mouseOver, setMouseOver] = useState(false)

  return (
    <figure
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      className='relative'
    >
      {mouseOver && (
        <Link href={`/photos/${id}`}>
          <div className={styles.card_hover}>
            <div className={styles.card_hover__header}>
              <p>
                <FontAwesomeIcon icon={faLocationPin} />
                <span>{location}</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faClock} />
                <span>{moment(dateTime).format('DD/MM/YYYY')}</span>
              </p>
            </div>
          </div>
        </Link>
      )}
      <Image
        src={`https://drive.google.com/thumbnail?&sz=w540&id=${fileId}`}
        blurDataURL={`https://drive.google.com/thumbnail?&sz=w540&id=${fileId}`}
        placeholder='blur'
        referrerPolicy="no-referrer"
        alt='Image'
        style={{
          height: 'auto',
          objectFit: 'contain',
          position: 'relative'
        }}
        width={480}
        height={100}
        quality={50}
      />
    </figure>
  )
}

export default ImageCard