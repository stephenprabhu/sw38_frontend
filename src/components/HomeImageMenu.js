import { useState } from 'react';
import DagaGif from '../assets/CHOI Button.png';
import styles from './HomeImageMenu.module.css';
import { IoGameControllerOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import SportsImage from '../assets/menu-sports.png';
import LiveCasinoImage from '../assets/menu-live.png';
import EsportsImage from '../assets/menu-esports.png';
import LotteryImage from '../assets/menu-lottery.png';
import { MdOutlineSportsVolleyball, MdOutlineSportsEsports, MdSportsGolf } from "react-icons/md";
import { BiVideoRecording } from "react-icons/bi";

const HomeImageMenu = () => {
  const [showRoundMenu, setShowRoundMenu] = useState(false);
  const navigate = useNavigate()

  return (
    <div className={styles.homeImageMenuIcon}>
      <div onClick={() => setShowRoundMenu(p => !p)}>
        <IoGameControllerOutline className={styles.icons} size={34} /><br />
        <span>TRÒ CHƠI +</span>
      </div>

      <div onClick={() => window.open("https://www.ssvv388.com/")}>
        <img src={DagaGif} />
      </div>

      <div onClick={() => navigate('/promotions')}>
        <GoGift className={styles.icons} size={34} /><br />
        <span>KHUYẾN MÃI <br /> / ĐẠI LÝ</span>
      </div>


      {showRoundMenu ? <>
        <div className={`${styles.goldBubble} ${styles.sports}`} onClick={() => window.open("https://www.vn138e.com/sports")}>
          <MdOutlineSportsVolleyball size={24} />
          Thể Thao
        </div>
        <div className={`${styles.goldBubble} ${styles.casino}`} onClick={() => window.open("https://www.vn138e.com/live")}>
          <BiVideoRecording size={24} />
          Live<br />Casino
        </div>
        <div className={`${styles.goldBubble} ${styles.esports}`} onClick={() => window.open("https://www.vn138e.com/esports")}>
          <MdOutlineSportsEsports size={26} />
          E Sports
        </div>
        <div className={`${styles.goldBubble} ${styles.lottery}`} onClick={() => window.open("https://www.vn138e.com/elott")}>
          <MdSportsGolf size={26} />
          Xổ số
        </div>
      </> : ""}
    </div>
  )
}

export default HomeImageMenu