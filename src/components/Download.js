import styles from './Download.module.css'
import { AiOutlineClose } from "react-icons/ai";
import { AiFillApple, AiFillAndroid, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Download = ({ setDownloadButtons }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.downloadOverlay} >
      <AiOutlineClose size={20} className={styles.closeIcon} onClick={() => setDownloadButtons(false)} />
      <div className={styles.buttonsOverlay}>
        <span style={{ color: '#F7DB89', fontWeight: 'bold' }}>Tải về máy</span>
        <AiOutlineArrowRight color='#F7DB89' />
        <div onClick={() => navigate('/android')}>
          <AiFillAndroid size={16} />
          <span>Android</span>
        </div>
        <div onClick={() => navigate('/ios-download')}>
          <AiFillApple size={16} />
          <span>IOS</span>
        </div>
      </div>
    </div>
  )
}

export default Download
