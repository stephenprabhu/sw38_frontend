import React, { useContext } from 'react'
import styles from './Header.module.css';
import SVLogo from '../assets/sv388-min.png';
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import HomeDrawerContent from './HomeDrawerContent';
import { Link } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import UserContext from '../helpers/Context/user-context';


const Header = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const ctx = useContext(UserContext);

  const onLogOutClicked = () => {
    ctx.setUser(null);
    ctx.setUserInfo({
      name: '',
      password: '',
    });
    localStorage.removeItem("auth_token");
  }

  return (
    <header >
      <div className={styles.headerOverlay}>
        <div className={styles.mainSiteHeader}>
          <div className="side-menu" style={{ cursor: "pointer" }} onClick={() => setDrawerOpened(true)}>
            <HiMenuAlt2 style={{ color: "#F7DB89" }} size={40} />
          </div>
          <div>
            <Link to="/">
              <img width={120} src={SVLogo} alt="site-logo" />
            </Link>
          </div>
          <div>
            {ctx.user ? <RxExit onClick={onLogOutClicked} className={styles.logOutButton} width={35} /> : ""}
          </div>
        </div>
      </div>
      <Drawer
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <HomeDrawerContent onClose={() => setDrawerOpened(false)} />
      </Drawer>
    </header>
  )
}

export default Header