import React, { useState } from 'react'
import LiveCasinoImage from '../assets/menu-live.png';
import CockFightImage from '../assets/menu-cockfight.png';
import EsportsImage from '../assets/menu-esports.png'
import SportsImage from '../assets/menu-sports.png';
import LotteryImage from '../assets/menu-lottery.png';
import styles from './HomeImageMenu.module.css'
import Modal from '@mui/material/Modal';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { IoMdFootball } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  backgroundImage: 'linear-gradient(180deg,#304063,#202c46)',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  border: '0px solid white',
  color: 'white'
};

const HomeImageMenu = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalItems = [
    { href: "https://www.ssvv388.com/", src: CockFightImage, text: 'CHƠI ĐÁ GÀ' },
    { href: "https://www.vn138e.com/sports", src: SportsImage, text: 'Thể Thao' },
    { href: "https://www.vn138e.com/live", src: LiveCasinoImage, text: 'Live Casino' },
    { href: "https://www.vn138e.com/esports", src: EsportsImage, text: 'E Sports' },
    { href: "https://www.vn138e.com/elott", src: LotteryImage, text: 'Xổ số' },
  ];

  // FiGift {mai}
  // GrGroup {daily}
  return (
    <div className={styles.homeImageMenuIcon}>
      <a href='https://www.vn138e.com/sports' target="_blank">
        <IoMdFootball color='rgb(200, 205, 214)' size={34} /><br />
        <span>THỂ THAO</span>
      </a>
      <div onClick={handleOpen}>
        <IoGameControllerOutline color='rgb(200, 205, 214)' size={34} /><br />
        <span>TRÒ CHƠI +</span>
      </div>
      <a href='https://www.ssvv388.com/' target="_blank" className={styles.daga}>
        <img src={CockFightImage} /><br />
        <span>CHƠI ĐÁ GÀ</span>
      </a>
      <a href='' target="_blank">
        <GoGift color='rgb(200, 205, 214)' size={34} /><br />
        <span>KHUYẾN MÃI</span>
      </a>
      <a href='' target="_blank">
        <HiOutlineUserGroup color='rgb(200, 205, 214)' size={34} /><br />
        <span>ĐẠI LÝ</span>
      </a>
      {/*All games modal*/}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">Tất cả trò chơi</Typography>
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
      </Modal>
    </div>
  )
}

export default HomeImageMenu