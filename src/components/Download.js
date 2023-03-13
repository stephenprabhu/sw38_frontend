import styles from './Download.module.css'
import { AiOutlineClose } from "react-icons/ai";
import { AiFillApple, AiFillAndroid, AiOutlineArrowRight } from "react-icons/ai";

const Download = ({ setDownloadButtons }) => {
  return (
    <div className={styles.downloadOverlay} >
      <AiOutlineClose size={20} className={styles.closeIcon} onClick={() => setDownloadButtons(false)} />
      <div className={styles.buttonsOverlay}>
        <span style={{ color: '#F7DB89', fontWeight: 'bold' }}>Tải về máy</span>
        <AiOutlineArrowRight color='#F7DB89' />
        <a href='gasv388.apk' download='gasv388.apk'>
          <AiFillAndroid size={16} />
          <span>Android</span>
        </a>
        <a>
          <AiFillApple size={16} />
          <span>IOS</span>
        </a>
      </div>
    </div>
  )
}

export default Download
