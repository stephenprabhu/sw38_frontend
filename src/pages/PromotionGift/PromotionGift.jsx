import styles from './PromotionGift.module.css';
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import PromoGiftImg from '../../assets/PromoGiftImg.jpg'
import Footer from '../../components/Footer/Footer';

const PromotionGift = () => {
  const param = useParams()
  const navigate = useNavigate()
  return (
    <div className={styles.promoOverlay}>
      
      <div className={styles.promoHeader}>
        <BsChevronLeft size={25} className={styles.promoBackIcon} onClick={() => navigate('/promotions')} />
        <div className={styles.promoTitle}>
          <p>Chào mừng nâng cấp toàn diện vn138 qatar cho thành viên cũ-clone</p>
          <div>
            <span>Thời gian khuyến mãi: </span>
            <span>06-06 ~ vô thời hạn</span>
          </div>
        </div>
      </div>
      
      <div className={styles.promoWrapper}>
        <img src={PromoGiftImg} alt='Promotion Gift'/>
      </div>
      
      <div className={styles.getGiftWrapper}>
        <button onClick={() => navigate('/promotion-details')}>Đăng ký Ngay</button>
      </div>

      <Footer active='Khuyến mãi'/>
    </div>
  )
}

export default PromotionGift