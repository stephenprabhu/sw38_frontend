import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ActiveHome from '../../assets/footer/ActiveHome.png';
import InActiveHome from '../../assets/footer/InActiveHome.png';
import ActivePromotion from '../../assets/footer/ActivePromotion.png';
import Money from '../../assets/footer/Transaction.png';
import CustomerSupport from '../../assets/footer/CustomerSupport.png';
import ActiveProfile from '../../assets/footer/ActiveProfile.png';
import InActiveProfile from '../../assets/footer/InActiveProfile.png';
import InActivePromotion from '../../assets/footer/InActivePromotion.png';
import { Modal } from '@mui/material';
import Deposit from '../../assets/footer/Deposit.png';
import Withdraw from '../../assets/footer/Withdraw.png';

const footerItems = [{active: ActiveHome, inActive: InActiveHome, name:'Trang Chủ', link: '/'}
  ,{active: ActivePromotion, inActive: InActivePromotion, name:'Khuyến mãi', link: '/promotions'}
  ,{inActive: CustomerSupport, name:'Hỗ Trợ', link: 'https://tawk.to/chat/6401c68c31ebfa0fe7f07069/1gqjev5o0'}
  ,{active: ActiveProfile, inActive: InActiveProfile, name:'Tài Khoản', link: '/profile'}
]

const moneyButtonsArray =[{image: Deposit, name: 'NẠP TIỀN', link: '/deposit'}, {image: Withdraw, name: 'RÚT TIỀN', link: '/withdraw'}] 

const BottomMenu = ({active}) => {
  const [activePage, setActivePage] = useState('Trang Chu');
  const [moneyButtonsModal, setMoneyButtonsModal] = useState(false);
  const navigate = useNavigate()
  
  // set active page
  useEffect(() => {
    setActivePage(active)
  },[active])

  return (
    <div className={styles.footerLayout}>
      {footerItems.slice(0,2).map(item => (
        <div className={styles.footerItem} onClick={() => {item.name == 'Hỗ Trợ' ? window.open(item.link) : navigate(item.link)}} key={item.name}>
          <img src={ activePage == item.name ? item.active : item.inActive}/>
          <span style={{ color: activePage == item.name ? '#FFEC80' : '#847459'}}>{item.name}</span>
        </div>
      ))}

      <div style={{width:'20%'}}>
        <div className={styles.moneyButton} onClick={() => setMoneyButtonsModal(true)}>
          <img src={Money} width={'45px'}/>
          <span>Money</span>
        </div>
      </div>

      {footerItems.slice(2).map(item => (
        <div className={styles.footerItem} onClick={() => {item.name == 'Hỗ Trợ' ? window.open(item.link) : navigate(item.link)}} key={item.name}>
          <img src={ activePage == item.name ? item.active : item.inActive}/>
          <span style={{ color: activePage == item.name ? '#FFEC80' : '#847459'}}>{item.name}</span>
        </div>
      ))}

      <Modal open={moneyButtonsModal}>
        <div className={styles.modalOverlay} onClick={() => setMoneyButtonsModal(false)}>
          <div className={styles.loadingSection} onClick={(e) => e.stopPropagation()}>
            {moneyButtonsArray.map(item => (
              <div className={styles.moneyBtn} key={item.name} onClick={() => {navigate(item.link); setMoneyButtonsModal(false)}}>
                <img src={item.image} alt={item.name} width={35}/>
                <span>{item.name}</span>
              </div>
            ))}  
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default BottomMenu