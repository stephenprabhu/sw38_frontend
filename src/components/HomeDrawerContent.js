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
          <a className={styles.gpsButton} target="_blank" rel='noreferrer' href='https://www.vn138e.com/sports'>Đá gà</a>
        </div>
        <span><a href="https://www.vn138e.com/live" target="_blank" rel='noreferrer'>Sòng bài</a></span>
        <span><a href='https://www.vn138e.com/sports' target="_blank" rel='noreferrer'>Thể Thao</a></span>
        <span><a href='https://www.vn138e.com/esports' target="_blank" rel='noreferrer'>Chơi Game</a></span>
        <span><a href='https://www.vn138e.com/esports' target="_blank" rel='noreferrer'>Xổ Số</a></span>
        <span><Link to="/member">Tài Khoản</Link></span>
      </div>
    </div>
  )
}

export default HomeDrawerContent