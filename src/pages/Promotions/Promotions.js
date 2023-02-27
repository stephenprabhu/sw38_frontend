import styles from './Promotions.module.css';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Promotions = () => {
  const [promotionsList, setPromotionsList] = useState()
  useEffect(() => {
    const promotionsList = async () => {
      const res = await axios.get('https://bo.ssv388.info/api/get_all_promotions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
      })
      if (res.data.status) {
        setPromotionsList(res.data.response)
      }
    }
    promotionsList()
  }, [])

  return (
    <div className={styles.promotionWrapper}>
      <Header />
      {/*headerSection*/}
      <div className={styles.promotionContent}>
        {/*Header Section*/}
        <div className={styles.promotionHeader}>
          <span>Agency</span>
          <div className={styles.headerButtons}>
            <button>Đăng Nhập</button>
           <Link to="/agent/promotions"> <button>Đăng ký</button></Link>
          </div>
        </div>
        {/*cardSection*/}
        <div className={styles.cardSectionWrapper}>
          {promotionsList && promotionsList.map((promo) =>
          (<div className={styles.card} key={promo.id} onClick={() => window.open(promo.link)}>
            <img height="100px" width='100%' src={promo.image} alt={''} />
            <div className={styles.cardContent}>
              <span className={styles.cardTitle}>{promo.title}</span>
              <div className={styles.dates}>
                <span>{promo.created_at && new Date(promo.created_at).toLocaleDateString("vi-VN")}&nbsp;-&nbsp;</span>
                <span> {promo.end_date ? new Date(promo.end_date).toLocaleDateString("vi-VN") : ' Dài hạn'}</span>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
      <BottomMenu />
    </div>
  )
}
export default Promotions
