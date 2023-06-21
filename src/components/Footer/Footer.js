import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ActiveHome from '../../assets/footer/ActiveHome.png';
import InActiveHome from '../../assets/footer/InActiveHome.png';
import ActivePromotion from '../../assets/footer/ActivePromotion.png';
import InActivePromotion from '../../assets/footer/InActivePromotion.png';
import ActiveDeposit from '../../assets/footer/ActiveDeposit.png';
import InActiveDeposit from '../../assets/footer/InActiveDeposit.png';
import ActiveWithdraw from '../../assets/footer/ActiveWithdraw.png';
import InActiveWithdraw from '../../assets/footer/InActiveWithdraw.png';
import CustomerSupport from '../../assets/footer/CustomerSupport.png';
import ActiveProfile from '../../assets/footer/ActiveProfile.png';
import InActiveProfile from '../../assets/footer/InActiveProfile.png';

const footerItems = [{active: ActiveHome, inActive: InActiveHome, name:'Trang Chủ', link: '/'}, {active: ActivePromotion, inActive: InActivePromotion, name:'Khuyến mãi', link: '/promotions'},
  {active: ActiveDeposit, inActive: InActiveDeposit, name:'Nạp Tiền', link: '/deposit'}, {active: ActiveWithdraw, inActive: InActiveWithdraw, name:'Rút Tiền', link: '/withdraw'},
  {inActive: CustomerSupport, name:'Hỗ Trợ', link: 'https://tawk.to/chat/6401c68c31ebfa0fe7f07069/1gqjev5o0'},
  {active: ActiveProfile, inActive: InActiveProfile, name:'Tài Khoản', link: '/profile'}]

const BottomMenu = ({active}) => {
  const [activePage, setActivePage] = useState('Trang Chủ')
  const navigate = useNavigate()
  
  // set active page
  useEffect(() => {
    setActivePage(active)
  },[active])
  
  return (
    <div className={styles.bottomMenuLayout}>
      {footerItems.map(item => (
        <div className={styles.menuItem} onClick={() => {item.name == 'Hỗ Trợ' ? window.open(item.link) : navigate(item.link)}} key={item.name}>
          <img src={ activePage == item.name ? item.active : item.inActive}/>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomMenu