import { useState } from 'react';
import styles from './MenuLogo.module.css';
import SVLogo from '../../assets/sv388-min.png';
import { HiMenuAlt2 } from "react-icons/hi";
import { Drawer } from '@mui/material';
import HomeDrawerContent from '../HomeDrawerContent';

const MenuLogo = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <div>
      <div className={styles.logoWrapper}>
        <span style={{display:'flex'}}><HiMenuAlt2 style={{ color: "#F7DB89", cursor: "pointer" }} onClick={() => setDrawerOpened(true)} /></span>
        <img src={SVLogo} alt="site-logo" />
      </div>
      <Drawer
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <HomeDrawerContent onClose={() => setDrawerOpened(false)} />
      </Drawer>
    </div>
  )
}

export default MenuLogo