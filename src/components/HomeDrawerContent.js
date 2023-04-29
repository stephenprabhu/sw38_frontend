import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import SVLogo from '../assets/sv388-min.png';
import { Link } from 'react-router-dom';
import styles from './HomeDrawerContent.module.css'

const HomeDrawerContent = ({ onClose }) => {
  return (
    <div>
      <div onClick={onClose}> <AiOutlineClose size={28} className={styles.closeBtn} /></div>
      <div style={{ textAlign: "center" }}>
        <img src={SVLogo} width={150} alt='svlogo'/>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/deposit" className={styles.button}>Nạp Tiền</Link>
        <Link to="/withdraw" className={styles.button}>Rút Tiền</Link>
      </div>
      <div className={styles.menuSection}>
        <div className={styles.gpsButtonWrapper}>
          <a className={styles.gpsButton} href='/game-links'>Đá gà</a>
        </div>
        <span><a href="https://vnn138.com/platform/real" target="_blank" rel='noreferrer'>Sòng bài</a></span>
        <span><a href='https://vnn138.com/platform/sport' target="_blank" rel='noreferrer'>Thể Thao</a></span>
        <span><a href='https://vnn138.com/platform/esports' target="_blank" rel='noreferrer'>Chơi Game</a></span>
        <span><a href='https://vnn138.com/platform/lottery/' target="_blank" rel='noreferrer'>Xổ Số</a></span>
        <span><Link to="/member">Tài Khoản</Link></span>
      </div>
    </div>
  )
}

export default HomeDrawerContent