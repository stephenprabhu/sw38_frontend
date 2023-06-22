import styles from './Promotions.module.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import PopupErrorModal from '../../components/PopupErrorModal';
// import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
// import { promotionsAPI } from '../../helpers/APIs/PromotionsAPI';
// import { FiLogOut } from "react-icons/fi";
// import { BiEdit } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import Footer from '../../components/Footer/Footer'
import { CircularProgress, Tab, Tabs } from '@mui/material';
import Promo1 from '../../assets/promotions/Promotion1.png';
import Promo2 from '../../assets/promotions/Promotion2.png';
import Promo3 from '../../assets/promotions/Promotion3.png';
import Promo4 from '../../assets/promotions/Promotion4.png';
import Promo5 from '../../assets/promotions/Promotion5.png';
import Promo6 from '../../assets/promotions/Promotion6.png';
import Promo7 from '../../assets/promotions/Promotion7.png';
import Promo8 from '../../assets/promotions/Promotion8.png';
import Promo9 from '../../assets/promotions/Promotion9.png';

const promotionArray = [Promo1, Promo2, Promo3, Promo4, Promo5, Promo6, Promo7, Promo8, Promo9, Promo1, Promo2, Promo3, Promo4, Promo5]

const Promotions = () => {
  // const [promotionsList, setPromotionsList] = useState()
  const [loginModal, setLoginModal] = useState(false)

  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    // const promotionsList = async () => {
    //   const res = await promotionsAPI()    
    //   if (res.data.status) {
    //     setPromotionsList(res.data.response)
    //   }
    // }
    // promotionsList()
  }, [])

  const handleChange = (e, newValue) => {
    setActiveTab(newValue);
    // if (newValue === "1") {
    //   setSelectedTransactions(transections.filter(t => t.transaction_purpose === "deposit"));
    // } else {
    //   setSelectedTransactions(transections.filter(t => t.transaction_purpose === "withdraw"));
    // }
  }

  return (
    <div className={styles.promoOverlay}>
      <div className={styles.promoHeader}>
        <BsChevronLeft size={25} className={styles.promoBackIcon} onClick={() => navigate('/')} />
        <div className={styles.promoTitle}>Promo</div>
      </div>
      <div className={styles.promoWrapper}>
        {/*<div className={styles.promoTabsOverlay}>
          <Tabs variant='fullWidth' value={activeTab} onChange={handleChange} sx={{ "& button.Mui-selected": { color: 'white' }, color: 'red'}} TabIndicatorProps={{ style: { backgroundColor: "white" } }}>
            <Tab label="TẤT CẢ" value="1" />
            <Tab label="NẠP TẶNG" value="2" />
            <Tab label="NỔ HŨ - BẮN CÁ" value="3" />
            <Tab label="CASINO" value="4" />  
            <Tab label="Nạp Tiền" value="5" />
            <Tab label="Rút Tiền" value="6" />
          </Tabs>
        </div>*/}
        <div className={styles.promoBodyOverlay}>
          {loading ? 
            <div style={{ textAlign: "center", marginTop: "15px" }}><CircularProgress style={{color:"white"}} /></div> 
            :
            promotionArray ?
              <div className={styles.promoBodyContent}>
                {promotionArray.map(((promo, index) => (
                  <img src={promo} key={index} alt='promoImg' onClick={() => navigate(`/promotion-gift`)}/>
                )))}
              </div>
            :
            <h3 style={{ margin: '0px', color: 'white' }}>Không có giao dịch</h3>
          }
        </div>
      </div>
      <Footer active='Khuyến mãi'/>
    </div>
  )
}
export default Promotions
// <Layout title='Khuyến mãi' active='Khuyến mãi'>
// </Layout>

// const LoginMsg = () => {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//       <span>Vui lòng liên hệ CSKH để được</span>
//       <CustomerSupportAnimatedItem />
//     </div>
//   )
// }

// {/*headerSection*/}
// <div className={styles.promotionContent}>
// {/*Header Section*/}
// <div className={styles.promotionHeader}>
//   <span>ĐẠI LÝ</span>
//   <div className={styles.headerButtons}>
//     <button onClick={() => setLoginModal(true)}><FiLogOut size={18} />Đăng Nhập</button>
//     <Link to='/agent/register' style={{ textDecoration: 'none' }}><button><BiEdit size={18} />Đăng ký</button></Link>
//   </div>
// </div>
// {/*cardSection*/}
// <div className={styles.cardSectionWrapper}>
//   <h3>KHUYẾN MÃI</h3>
//   {promotionsList && promotionsList.map((promo) =>(
//     <div className={styles.card} key={promo.id} onClick={() => window.open(promo.link)}>
//       <img height="100px" width='100%' src={promo.image} alt='promoImg'/>
//       <div className={styles.cardContent}>
//         <span className={styles.cardTitle}>{promo.title}</span>
//         <div className={styles.dates}>
//           <span>{promo.created_at && new Date(promo.created_at).toLocaleDateString("vi-VN")}&nbsp;-&nbsp;</span>
//           <span> {promo.end_date ? new Date(promo.end_date).toLocaleDateString("vi-VN") : ' Dài hạn'}</span>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
// </div>
// <PopupErrorModal show={loginModal} hideModal={() => setLoginModal(false)} message={<LoginMsg />} error={false} />