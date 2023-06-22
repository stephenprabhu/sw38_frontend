import styles from './PromotionDetail.module.css';
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import PromoGiftImg from '../../assets/PromoGiftImg.jpg'
import Footer from '../../components/Footer/Footer';

const PromotionDetail = () => {
  const navigate = useNavigate()
  // const rawHTML = promoItem && promoItem[0] && promoItem[0].body
  
  return (
    <div className={styles.promoOverlay}>
      
      <div className={styles.promoHeader}>
        <BsChevronLeft size={28} className={styles.promoBackIcon} onClick={() => navigate('/promotion-gift')} />
        <div className={styles.promoTitle}>
          <p>Bảo hiểm nổ hũ – bắn cá cao nhất thị trườnglên tới 60.000.000 vnd mỗi ngày</p>
          <div>
            <span>Promotion Period:</span>
            <span>05-31 ~ Indefinite</span>
          </div>
        </div>
      </div>
      
      <div className={styles.promoWrapper}>
        Promo Details
        {/*<p dangerouslySetInnerHTML={{ __html: rawHTML }} />*/}
      </div>

      <Footer active='Khuyến mãi'/>

    </div>
  )
}

export default PromotionDetail