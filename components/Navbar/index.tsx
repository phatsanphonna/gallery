import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Navbar.module.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <Link href='/'>
          <h1 className='font-bold text-xl select-none'>Phatsanphon Gallery</h1>
        </Link>
        <div className={styles.search_box}>
          <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
          <input
            type="search"
            className='w-full h-full bg-transparent'
            placeholder='ค้นหารูปภาพที่น่าสนใจ'
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar