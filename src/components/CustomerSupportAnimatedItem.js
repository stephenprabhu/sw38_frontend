import styles from './CustomerSupportAnimatedItem.module.css';
import { MdAddCall } from "react-icons/md";

const CustomerSupportAnimatedItem = () => {
  return (
    <div className={styles.buttonWrapper} onClick={() => window.open('https://tawk.to/chat/6401c68c31ebfa0fe7f07069/1gqjev5o0')}>
      CSKH<MdAddCall size={20} />
    </div>
  )
}

export default CustomerSupportAnimatedItem