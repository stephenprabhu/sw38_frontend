import styles from './CustomerSupportAnimatedItem.module.css';
import { FaHandPointRight } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";

const CustomerSupportAnimatedItem = () => {
  return (
    <div className={styles.buttonWrapper} onClick={() => window.open('https://direct.lc.chat/14707113/')}>
      <FaHandPointRight size={20} /> Hỗ trợ <MdAddCall size={20} />
    </div>
  )
}

export default CustomerSupportAnimatedItem