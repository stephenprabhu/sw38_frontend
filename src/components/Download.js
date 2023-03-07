import styles from './Download.module.css'
import { AiOutlineClose } from "react-icons/ai";
import { AiFillApple, AiFillAndroid } from "react-icons/ai";

const Download = ({ setDownloadButtons }) => {
  return (
    <div className={styles.downloadOverlay} >
      <AiOutlineClose size={20} className={styles.closeIcon} onClick={() => setDownloadButtons(false)} />
      <div className={styles.buttonsOverlay}>
        <div className={styles.ButtonWrapper}>
          <a href='svw38.apk' download='svw38.apk'>
            <AiFillAndroid size={18} />
            <span>Download</span>
          </a>
        </div>
        <div className={styles.ButtonWrapper}>
          <a>
            <AiFillApple size={18} />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Download
