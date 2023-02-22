import React, { useState } from 'react'
import LiveCasinoImage from '../assets/menu-live.png';
import CockFightImage from '../assets/menu-cockfight.png';
import EsportsImage from '../assets/menu-esports.png'
import SportsImage from '../assets/menu-sports.png';
import LotteryImage from '../assets/menu-lottery.png';
import styles from './HomeImageMenu.module.css'
import Modal from '@mui/material/Modal';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#bb955b',
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
  return (
    <div className={styles.homeImageMenuIcon}>
      <a href="https://www.vn138e.com/live" target="_blank">
        <img src={LiveCasinoImage} /><br />
        <span>Live Casino</span>
      </a>
      <a href='https://www.vn138e.com/sports' target="_blank">
        <img src={SportsImage} /><br />
        <span>Thể Thao</span>
      </a>
      <a href='https://www.ssvv388.com/' target="_blank" className={styles.daga}>
        <img src={CockFightImage} /><br />
        <span>Đá gà</span>
      </a>
      <div onClick={handleOpen}>
        <img src={EsportsImage} /><br />
        <span>More Games</span>
      </div>
      <a href='https://www.vn138e.com/elott' target="_blank">
        <img src={LotteryImage} /><br />
        <span>Promotions</span>
      </a>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">Tất cả trò chơi</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={{ style: 'flex', gap: 2 }} component="a" href="https://www.vn138e.com/live">
                <img src={LiveCasinoImage} width='30px' />
                <ListItemText primary="Live Casino" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton sx={{ style: 'flex', gap: 2 }} component="a" href="https://www.vn138e.com/sports">
                <img src={SportsImage} width='30px' />
                <ListItemText primary="Thể Thao" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton sx={{ style: 'flex', gap: 2 }} component="a" href="https://www.ssvv388.com/">
                <img src={CockFightImage} width='30px' />
                <ListItemText primary="Đá gà" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton sx={{ style: 'flex', gap: 2 }} component="a" href="https://www.vn138e.com/esports
              ">
                <img src={EsportsImage} width='30px' />
                <ListItemText primary="E Sports" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton sx={{ style: 'flex', gap: 2 }} component="a" href="https://www.vn138e.com/elott">
                <img src={LotteryImage} width='30px' />
                <ListItemText primary="Lottary" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </div>
  )
}

export default HomeImageMenu