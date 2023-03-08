import styles from './InnerHeader.module.css'
import { BsChevronLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';


const InnerHeader = ({ title }) => {
  return (
    <div className={styles.headerOverlay}>
      <div className={styles.header}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <BsChevronLeft size={25} color='#F7DB89' />
        </Link>
        <div>
          <span className={styles.headerTitle}>{title}</span>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default InnerHeader