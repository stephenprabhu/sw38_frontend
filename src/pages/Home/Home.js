import { Link } from "react-router-dom";
import BannerImage from "../../assets/home_banner.png"
import HomeImageMenu from '../../components/HomeImageMenu';
import Header from "../../components/Header";
import BottomMenu from "../../components/BottomMenu";
import { useContext, useEffect } from "react";
import UserContext from "../../helpers/Context/user-context";
import CockFightBanner from "../../assets/sub-animal-sv.png"
import styles from './Home.module.css'
import CockFightBanner2 from "../../assets/cock-banner-2.jpeg"
import axios from "axios";

const Home = () => {
  const ctx = useContext(UserContext);
  const userInfo = ctx.userInfo;
  const user = ctx.user

  // Refresh page user credentials API call
  useEffect(() => {
    const userData = async () => {
      const res = await axios.get("https://bo.ssv388.info/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      ctx.setUserInfo({
        name: res.data.phone,
        password: res.data.password,
      });
    }
    if (!userInfo) {
      userData()
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <Header />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <a href='https://www.vn138e.com/esports' target="_blank">
          <img src={BannerImage} width="100%" />
        </a>
        <marquee direction="left" style={{ color: '#fce08d', fontSize: '12px', padding: '5px 0px', margin: '0px 7px', fontStyle: 'italic' }}>
          ĐÁ GÀ SV388 NƠI CÁC CHIẾN KÊ HUYỀN THOẠI THỂ HIỆN CHỈ CÓ TẠI SVW38.COM
        </marquee>
        {!ctx.user ? <div className='register-login-section'>
          <Link className='login-button' to='/login'>Đăng Nhập</Link>
          <Link className='register-button' to='/register'>Đăng ký</Link>
        </div> : ""}
        <HomeImageMenu />
        {user && userInfo &&
          <div className={styles.userInfoSection}>
            <CopyItemComponent item={{ label: "Tên tài khoản", value: userInfo.name }} />
            <CopyItemComponent item={{ label: "Mật khẩu", value: userInfo.password }} />
          </div>}
        <div className={styles.cockfightSection}>
          <div><a href='https://www.vn138e.com/esports' target="_blank"><img src={CockFightBanner} width={"75%"} /></a></div>
          <div style={{ padding: '0px 10px' }}>
            <h3 style={{ margin: '0px' }}>Đá gà SV388</h3>
            <p>Đá gà Thomo trực tuyến độc quyền tại SVW38.COM</p>
            <a href="https://www.ssvv388.com/" target="_blank" className={styles.myLink}>ĐẶT CƯỢC NGAY</a>
          </div>
        </div>
        <h2 style={{ color: "white", fontSize: "0.8em", margin: "15px 0px" }}>TRANG ĐÁ GÀ UY TÍN NHẤT VIỆT NAM</h2>
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
      <span className={styles.copyButton} onClick={onCopyClicked}>
        Copy
      </span>
    </div>
  )
}

export default Home