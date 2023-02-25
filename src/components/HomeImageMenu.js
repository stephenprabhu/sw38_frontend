import DagaGif from '../assets/daga.gif';
import styles from './HomeImageMenu.module.css';
import { IoGameControllerOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import SportsImage from '../assets/menu-sports.png';
import LiveCasinoImage from '../assets/menu-live.png';
import EsportsImage from '../assets/menu-esports.png'
import LotteryImage from '../assets/menu-lottery.png'
import { useState } from 'react';

const HomeImageMenu = () => {
  const [showRoundMenu, setShowRoundMenu] = useState(false);

  const modalItems = [
    { href: "https://www.vn138e.com/sports", src: SportsImage, text: 'Thể Thao' },
    { href: "https://www.vn138e.com/live", src: LiveCasinoImage, text: 'Live Casino' },
    { href: "https://www.vn138e.com/esports", src: EsportsImage, text: 'E Sports' },
    { href: "https://www.vn138e.com/elott", src: LotteryImage, text: 'Xổ số' },
  ];

  const navigate = useNavigate()

  return (
    <div className={styles.homeImageMenuIcon}>
      <div onClick={()=> setShowRoundMenu(p=> !p)} style={{cursor:"pointer"}}>
        <IoGameControllerOutline color='rgb(200, 205, 214)' size={34} /><br />
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


      {showRoundMenu ? <>
        <div className={`${styles.goldBubble} ${styles.sports}`} onClick={()=> window.open("https://www.vn138e.com/sports")}>
            <img src={SportsImage} width={20} />
            Thể Thao
        </div>
        <div className={`${styles.goldBubble} ${styles.casino}`} onClick={()=> window.open("https://www.vn138e.com/live")}>
          <img src={LiveCasinoImage} width={20} />
            Live<br />Casino
        </div>
        <div className={`${styles.goldBubble} ${styles.esports}`} onClick={()=> window.open("https://www.vn138e.com/esports")}>
          <img src={EsportsImage} width={20} />
          E Sports
        </div>
        <div className={`${styles.goldBubble} ${styles.lottery}`} onClick={()=> window.open("https://www.vn138e.com/elott")}>
          <img src={LotteryImage} width={20} />
          Xổ số
        </div>
      </> :""}




      {/*All games modal*/}
      {/* <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" color='rgb(252, 224, 141)'>Tất cả trò chơi</Typography>
          <List>
            {modalItems.map((game) => {
              return (
                <ListItem disablePadding key={game.href}>
                  <div className={game.text === 'Đá gà' ? styles.dagaModalBtn : ''}>
                    <ListItemButton sx={{ style: 'flex', gap: 2 }} component="a" href={game.href} target="_blank">
                      <img src={game.src} width='30px' />

                      <ListItemText primary={game.text} sx={{ textTransform: 'capitalize' }} />
                    </ListItemButton>
                  </div>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Modal> */}
    </div>
  )
}

export default HomeImageMenu