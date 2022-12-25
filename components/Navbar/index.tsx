import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Navbar.module.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <h1 className='font-bold text-xl'>Phatsanphon Gallery</h1>

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