import React from 'react'
import styles from './BottomMenu.module.css';
import { FaDollarSign } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { AiFillDollarCircle } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const BottomMenu = () => {
  return (
    <div className={styles.BottomMenuOverlay}>
      <div className={styles.bottomMenuLayout}>
        <Link to="/deposit" style={{ textDecoration: "none" }}>
          <div className={styles.menuItem}>
            <FaDollarSign size={30} />
            <span>Nạp Tiền</span>
          </div>
        </Link>
        <Link to="/withdraw" style={{ textDecoration: "none" }}>
          <div className={styles.menuItem}>
            <AiFillDollarCircle size={30} />
            <span>Rút Tiền</span>
          </div>
        </Link>

        {/* <Link to="/">
        <div className={styles.menuItem}>
            <AiOutlineHome size={30} />
            <span>Trang Chủ</span>
        </div>
        </Link> */}
        <a href="https://direct.lc.chat/14707113/" target="_blank" rel="noreffer" style={{ textDecoration: "none" }}>
          <div className={styles.menuItem}>
            <TfiHeadphoneAlt size={30} />
            <span>Hỗ Trợ 24/7</span>
          </div>
        </a>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div className={styles.menuItem}>
            <CgProfile size={30} />
            <span>Tài Khoản</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BottomMenu