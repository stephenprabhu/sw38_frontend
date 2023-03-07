import styles from './Promotions.module.css';
import BottomMenu from '../../components/BottomMenu';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PopupErrorModal from '../../components/PopupErrorModal';
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import { promotionsAPI } from '../../helpers/APIs/PromotionsAPI';
import { FiLogOut } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

const Promotions = () => {
  const [promotionsList, setPromotionsList] = useState()
  const [loginModal, setLoginModal] = useState(false)

  useEffect(() => {
    const promotionsList = async () => {
      const res = await promotionsAPI()
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
          <span>ĐẠI LÝ</span>
          <div className={styles.headerButtons}>
            <button onClick={() => setLoginModal(true)}><FiLogOut size={18} />Đăng Nhập</button>
            <Link to='/agent/register' style={{ textDecoration: 'none' }}><button><BiEdit size={18} />Đăng ký</button></Link>
          </div>
        </div>
        {/*cardSection*/}
        <div className={styles.cardSectionWrapper}>
          <h3>KHUYẾN MÃI</h3>
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
      <PopupErrorModal show={loginModal} hideModal={() => setLoginModal(false)} message={<LoginMsg />} error={false} />
      <BottomMenu />
    </div>
  )
}
export default Promotions

const LoginMsg = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span>
        Vui lòng liên hệ CSKH để được
      </span>
      <CustomerSupportAnimatedItem />
    </div>
  )
}