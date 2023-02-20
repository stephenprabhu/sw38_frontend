import styles from './InnerHeader.module.css'
import { BsChevronLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';


const InnerHeader = ({title}) => {
  return (
    <div className={styles.header}>
        <div>
            <Link to="/" style={{textDecoration:"none", color: "white"}}>
              <BsChevronLeft size={25} />
            </Link>
            
        </div>
        <div>
            <span className={styles.headerTitle}>{title}</span>
        </div>
        <div>

        </div>
    </div>
  )
}

export default InnerHeader