import { useState } from 'react';
import DagaGif from '../assets/daga.gif';
import styles from './HomeImageMenu.module.css';
import { IoGameControllerOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import SportsImage from '../assets/menu-sports.png';
import LiveCasinoImage from '../assets/menu-live.png';
import EsportsImage from '../assets/menu-esports.png'
import LotteryImage from '../assets/menu-lottery.png'

const HomeImageMenu = () => {
  const [showRoundMenu, setShowRoundMenu] = useState(false);
  const navigate = useNavigate()

  return (
    <div className={styles.homeImageMenuIcon}>
      <div onClick={() => setShowRoundMenu(p => !p)}>
        <IoGameControllerOutline color='rgb(200, 205, 214)' size={34} /><br />
        <span>TRÒ CHƠI +</span>
      </div>

      <div onClick={() => window.open("https://www.ssvv388.com/")}>
        <img src={DagaGif} style={{ width: '100%', height: '70px' }} />
      </div>

      <div onClick={() => navigate('/promotions')}>
        <GoGift color='rgb(200, 205, 214)' size={24} /><br />
        <span>KHUYẾN MÃI <br /> / ĐẠI LÝ</span>
      </div>


      {showRoundMenu ? <>
        <div className={`${styles.goldBubble} ${styles.sports}`} onClick={() => window.open("https://www.vn138e.com/sports")}>
          <img src={SportsImage} width={20} />
          Thể Thao
        </div>
        <div className={`${styles.goldBubble} ${styles.casino}`} onClick={() => window.open("https://www.vn138e.com/live")}>
          <img src={LiveCasinoImage} width={20} />
          Live<br />Casino
        </div>
        <div className={`${styles.goldBubble} ${styles.esports}`} onClick={() => window.open("https://www.vn138e.com/esports")}>
          <img src={EsportsImage} width={20} />
          E Sports
        </div>
        <div className={`${styles.goldBubble} ${styles.lottery}`} onClick={() => window.open("https://www.vn138e.com/elott")}>
          <img src={LotteryImage} width={20} />
          Xổ số
        </div>
      </> : ""}
    </div>
  )
}

export default HomeImageMenu