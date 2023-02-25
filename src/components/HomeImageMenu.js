import DagaGif from '../assets/daga.gif';
import styles from './HomeImageMenu.module.css';
import { IoGameControllerOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const HomeImageMenu = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.homeImageMenuIcon}>

      <div>
        <IoGameControllerOutline color='rgb(200, 205, 214)' size={24} /><br />
        <span>TRÒ CHƠI +</span>
      </div>

      <div>
        <a href='https://www.ssvv388.com/'>
          <img src={DagaGif} style={{ width: '100%', height: '70px' }} />
        </a>
      </div>

      <div onClick={() => navigate('/promotions')}>
        <GoGift color='rgb(200, 205, 214)' size={24} /><br />
        <span>KHUYẾN MÃI <br /> / ĐẠI LÝ
        </span>
      </div>
    </div>
  )
}

export default HomeImageMenu