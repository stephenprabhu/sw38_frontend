import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import SVLogo from '../assets/sv388-min.png';
import { Link } from 'react-router-dom';
import styles from './HomeDrawerContent.module.css'


const HomeDrawerContent = ({onClose}) => {
  return (
    <div>
        <div onClick={onClose} style={{padding:"20px"}}> <AiOutlineClose size={30} /></div>
        <div style={{textAlign:"center"}}>
          <img src={SVLogo} width={150} />
        </div>
        <div style={{textAlign:"center", marginTop:"20px"}}>
          <Link to="/deposit" className={styles.button}>Nạp Tiền</Link>
          <Link to="/withdraw" className={styles.button}>Rút Tiền</Link>
        </div>
        <div className={styles.menuSection}>
        <span>
          <Link to="/">Trang Chủ</Link>
        </span>
        <span>
          <a href="https://www.vn138e.com/live" target="_blank">Sòng bài</a>
        </span>
        <span>
          <a href='https://www.vn138e.com/sports' target="_blank">Thể Thao</a>
        </span>
        <span>
          <a href='https://www.vn138e.com/sports' target="_blank">Đá gà</a>
        </span>
        <span>
          <a href='https://www.vn138e.com/esports' target="_blank">Chơi Game</a>
        </span>
        <span>
          <a href='https://www.vn138e.com/esports' target="_blank">Xổ Số</a>
        </span>
        <span>
          <Link to="/member">Tài Khoản</Link>
        </span>
        </div>
    </div>
  )
}

export default HomeDrawerContent