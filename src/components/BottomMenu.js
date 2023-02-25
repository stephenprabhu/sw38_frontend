import React from 'react'
import { AiOutlineHome, AiOutlineMoneyCollect } from 'react-icons/ai';
import styles from './BottomMenu.module.css';
import {FaMoneyBillWaveAlt} from "react-icons/fa";
import {RiCustomerService2Line}  from "react-icons/ri";
import {CgProfile}  from "react-icons/cg";
import { Link } from 'react-router-dom';

const BottomMenu = () => {
  return (
    <div className={styles.bottomMenuLayout}>
        <Link to="/deposit" style={{textDecoration:"none"}}>
            <div className={styles.menuItem}>
                <AiOutlineMoneyCollect size={30} />
                <span>Nạp Tiền</span>
            </div>
        </Link>
        <Link to="/withdraw" style={{textDecoration:"none"}}>
            <div className={styles.menuItem}>
                <FaMoneyBillWaveAlt size={30} />
                <span>Rút Tiền</span>
            </div>
        </Link>
        
        {/* <Link to="/">
        <div className={styles.menuItem}>
            <AiOutlineHome size={30} />
            <span>Trang Chủ</span>
        </div>
        </Link> */}
        <a href="https://direct.lc.chat/14707113/" target="_blank" rel="noreffer" style={{textDecoration:"none"}}>
            <div className={styles.menuItem}>
                <RiCustomerService2Line size={30} />
                <span>Hỗ Trợ 24/7</span>
            </div>
        </a>
        <Link to="/member" style={{textDecoration:"none"}}>
            <div className={styles.menuItem}>
                <CgProfile size={30} />
                <span>Tài Khoản</span>
            </div>
        </Link>
    </div>
  )
}

export default BottomMenu