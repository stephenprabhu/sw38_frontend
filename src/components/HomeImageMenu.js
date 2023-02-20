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
            <a href="https://www.vn138e.com/live">
                <img src={LiveCasinoImage} /><br />
                <span>Sòng bài</span>
            </a>
        </div>
        <div>
            <a href='https://www.vn138e.com/sports'>
                <img src={SportsImage} /><br />
                <span>Thể Thao</span>
            </a>
        </div>
        <div>
            <a href='https://www.ssvv388.com/'>
                <img className={styles.goldIcon} src={CockFightImage} /><br />
                <span>Đá gà</span>
            </a>
        </div>
        <div>
            <a href='https://www.vn138e.com/esports'>
                <img src={EsportsImage} /><br />
                <span>Chơi Game</span>
            </a>

        </div>
        <div>
            <a href='https://www.vn138e.com/elott'>
                <img src={LotteryImage} /><br />
                <span>Xổ Số</span>
            </a>
        </div>
    </div>
  )
}

export default HomeImageMenu