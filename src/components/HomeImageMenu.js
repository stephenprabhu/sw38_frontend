import React from 'react'
import LiveCasinoImage from '../assets/menu-live.png';
import CockFightImage  from '../assets/menu-cockfight.png';
import EsportsImage from '../assets/menu-esports.png'
import SportsImage from '../assets/menu-sports.png';
import LotteryImage from '../assets/menu-lottery.png';
import styles from './HomeImageMenu.module.css'

const HomeImageMenu = () => {
  return (
    <div className={styles.homeImageMenuIcon}>
        <div>
            <a href="https://www.vn138e.com/live" target="_blank">
                <img src={LiveCasinoImage} /><br />
                <span>Sòng bài</span>
            </a>
        </div>
        <div>
            <a href='https://www.vn138e.com/sports' target="_blank">
                <img src={SportsImage} /><br />
                <span>Thể Thao</span>
            </a>
        </div>
        <div>
            <a href='https://www.ssvv388.com/' target="_blank">
                <img className={styles.goldIcon} src={CockFightImage} /><br />
                <span className={styles.gold}>Đá gà</span>
            </a>
        </div>
        <div>
            <a href='https://www.vn138e.com/esports' target="_blank">
                <img src={EsportsImage} /><br />
                <span>Chơi Game</span>
            </a>

        </div>
        <div>
            <a href='https://www.vn138e.com/elott' target="_blank">
                <img src={LotteryImage} /><br />
                <span>Xổ Số</span>
            </a>
        </div>
    </div>
  )
}

export default HomeImageMenu