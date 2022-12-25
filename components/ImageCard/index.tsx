import Image from 'next/image'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import styles from './ImageCard.module.css'
import Link from 'next/link'

type Props = {
  id: string
}

const ImageCard: React.FC<Props> = ({ id }) => {
  const [mouseOver, setMouseOver] = useState(false)

  return (
    <Link href={`/photos/${id}`}>
      <figure
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        className='relative'
      >
        {mouseOver && (
          <div className={styles.card_hover}>
            <div className={styles.card_hover__header}>
              <p>
                <FontAwesomeIcon icon={faLocationPin} />
                <span>Siam Scape</span>
              </p>
              <a
                download={true}
                className='w-8 h-8 text-black bg-slate-100 grid place-items-center rounded'
                href={`https://drive.google.com/uc?export=download&id=${id}`}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </a>
            </div>
          </div>
        )}
        <Image
          src={`https://drive.google.com/uc?export=view&id=${id}`}
          blurDataURL={`https://drive.google.com/uc?export=view&id=${id}`}
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
    </Link>
  )
}

export default ImageCard