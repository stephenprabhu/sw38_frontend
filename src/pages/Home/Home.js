import { Link } from "react-router-dom";
import BannerImage from "../../assets/home_banner.png"
import HomeImageMenu from '../../components/HomeImageMenu';
import Header from "../../components/Header";
import BottomMenu from "../../components/BottomMenu";
import { useContext, useState } from "react";
import UserContext from "../../helpers/Context/user-context";
import CockFightBanner from "../../assets/sub-animal-sv.png"
import styles from './Home.module.css'
import CockFightBanner2 from "../../assets/cock-banner-2.jpeg"

const Home = () => {
  const ctx = useContext(UserContext);
  const userInfo = ctx.userInfo;


  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
        <Header />
        <div style={{flex: 1, overflowY:"auto"}}>
          <img src={BannerImage} width="100%" />
          {!ctx.user ? <div className='register-login-section'>
            <Link className='login-button' to='/login'>Đăng Nhập</Link>
            <Link className='register-button' to='/register'>Đăng ký</Link> 
          </div> : ""}
          <HomeImageMenu />
          {userInfo ?           
          <div className={styles.userInfoSection}>
            <CopyItemComponent item={{ label: "Tên tài khoản", value: userInfo.name }} />
            <CopyItemComponent item={{ label: "Mật khẩu", value: userInfo.password }} />
            <CopyItemComponent item={{ label: "Số dư tài khoản", value: userInfo.balance }} />
          </div> : ""}
        <div className={styles.cockfightSection}>
          <div><img src={CockFightBanner} width={"75%"} /></div>
          <div>
            <h3>Đá gà SV388</h3>
            <p> được tường thuật trực tiếp. Kèo đấn kịch tính, hấp dẫn</p>
            <a href="https://www.ssvv388.com/" target="_blank">Xem trực tiếp</a>
          </div>
          
        </div>
        <h2 style={{color:"white", fontSize:"0.8em", marginTop:"10px"}}>TRANG ĐÁ GÀ UY TÍN NHẤT VIỆT NAM</h2>
        <img src={CockFightBanner2} width="100%" />
      </div>
      <BottomMenu />
    </div>
  )
}


const CopyItemComponent = ({ item }) => {

  const onCopyClicked = () => {
    navigator.clipboard.writeText(item.value);
  }

  return (
    <div className={styles.bankDetailItem}>
      <div style={{ textAlign: "left" }}>
        <span className={styles.grayLabel}>{item.label}</span><br />
        <span className={styles.grayValue}>{item.value}</span>
      </div>
      <button className={styles.copyButton} onClick={onCopyClicked}>
        Copy
      </button>
    </div>
  )
}

export default Home