import React, { useContext } from 'react'
import styles from './Header.module.css';

import loginImage from '../assets/loginImage.png';
import registerImage from '../assets/registerImage.png'

import { BsChevronLeft } from "react-icons/bs";
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import HomeDrawerContent from './HomeDrawerContent';
import { Link, useNavigate } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import UserContext from '../helpers/Context/user-context';
import MenuLogo from './HeaderComponents/MenuLogo/MenuLogo';
import BalanceSection from './HeaderComponents/BalanceSection/BalanceSection';

const Header = ({title}) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const ctx = useContext(UserContext);
  const navigate = useNavigate()


  return (
    <header className={styles.headerOverlay}>
      {title ?
        <BsChevronLeft size={25} style={{color:'#FCE8AE', cursor:'pointer'}} onClick={() => navigate('/')} />   
        :
        <MenuLogo/>
      }

      {title && <div className={styles.headerTitle}>{title}</div>}
      
      {!ctx.user ?
        <BalanceSection/>
        :
        <div className={styles.loginButtonsOverlay}>
          <div className={styles.loginButtons} onClick={() => navigate('/register')}>
            <img src={registerImage} alt='Đăng ký'/>
            <div>Đăng ký</div>
          </div>
          <div className={styles.loginButtons} onClick={() => navigate('/login')}>
            <img src={loginImage} alt='Đăng Nhập'/>
            <div>Đăng Nhập</div>
          </div>
        </div>
      }
    </header>
  )
}

export default Header

// <div className={styles.loginButtonsOverlay}>
//           <span>{ctx.userInfo && ctx.userInfo.name}</span>
//           <RxExit onClick={onLogOutClicked} className={styles.logOutButton} size={22} />
//         </div>