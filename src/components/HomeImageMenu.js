
import LiveCasinoImage from '../assets/menu-live.png';
import DagaGif from '../assets/daga.gif';
import EsportsImage from '../assets/menu-esports.png'
import SportsImage from '../assets/menu-sports.png';
import LotteryImage from '../assets/menu-lottery.png';
import styles from './HomeImageMenu.module.css';
import { IoGameControllerOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const HomeImageMenu = () => {
  const modalItems = [
    { href: "https://www.vn138e.com/sports", src: SportsImage, text: 'Thể Thao' },
    { href: "https://www.vn138e.com/live", src: LiveCasinoImage, text: 'Live Casino' },
    { href: "https://www.vn138e.com/esports", src: EsportsImage, text: 'E Sports' },
    { href: "https://www.vn138e.com/elott", src: LotteryImage, text: 'Xổ số' },
  ];

  const navigate = useNavigate()

  return (
    <div className={styles.homeImageMenuIcon}>

      <div>
        <IoGameControllerOutline color='rgb(200, 205, 214)' size={34} /><br />
        <span>TRÒ CHƠI +</span>
      </div>

      <div>
        <a href='https://www.ssvv388.com/' > <img src={DagaGif} style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '60px' }} /> </a>
      </div>

      <div onClick={() => navigate('/promotions')}>
        <GoGift color='rgb(200, 205, 214)' size={34} /><br />
        <span>KHUYẾN MÃI / ĐẠI LÝ
        </span>
      </div>
    </div>
  )
}

export default HomeImageMenu