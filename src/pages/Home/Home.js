import { Link, useNavigate } from "react-router-dom";
import BannerImage from "../../assets/Banner IMG.png"
import HomeImageMenu from '../../components/HomeImageMenu';
import Header from "../../components/Header";
import BottomMenu from "../../components/BottomMenu";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../helpers/Context/user-context";
import CockFightBanner from "../../assets/sub-animal-sv.png";
import styles from './Home.module.css';
import CoolAnimatedButton from "../../components/CoolAnimatedButton";
import { MdOutlineContentCopy } from "react-icons/md";
import CustomerSupportAnimatedItem from "../../components/CustomerSupportAnimatedItem";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { APIUser } from "../../helpers/APIs/UserAPIs";

const Home = () => {
  const ctx = useContext(UserContext);
  const userInfo = ctx.userInfo;
  const user = ctx.user;

  const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());   
	const isInitalDeposit = params && params.initial;



  // Refresh page user credentials API call
  useEffect(() => {
    const userData = async () => {
      const userApiData = await APIUser()
      if (userApiData.response && userApiData.response.data.message === "Unauthenticated.") {
        localStorage.removeItem('auth_token')
        ctx.setUser('');
      } else {
        ctx.setUserInfo({
          name: userApiData ? userApiData.phone : '-',
          user_id: userApiData ? userApiData.user_id : '-',
          password: userApiData ? userApiData.raw_string : '-' ,
        });
      }
    }
    if (!userInfo && localStorage.getItem('auth_token')) {
      userData()
    }
  }, []);

  return (
    <div className={styles.homeOverlay}>
      <Header />
      <div className={styles.homeWrapper}>
        <a href='https://www.ssvv388.com/' target="_blank">
          <img src={BannerImage} width="100%" />
        </a>
        <marquee direction="left" style={{ color: '#fce08d', fontSize: '12px', padding: '5px 0px', margin: '0px 7px', fontStyle: 'italic' }}>
          ĐÁ GÀ SV388 NƠI CÁC CHIẾN KÊ HUYỀN THOẠI THỂ HIỆN CHỈ CÓ TẠI SVW38.COM
        </marquee>
        {!ctx.user ? <div className={styles.registerLoginSection}>
          <Link className={styles.loginButton} to='/login'>Đăng Nhập</Link>
          <Link className={styles.registerButton} to='/register'>Đăng ký</Link>
        </div> : ""}
        <HomeImageMenu />
        {user && userInfo &&
          <div className={styles.userInfoSection}>
            {!isInitalDeposit ? <CopyItemComponent item={{ label: "Số điện thoại đăng nhập", value: userInfo.name }} /> : ""}
            <CopyItemComponent item={{ label: "Tai khan SV388", value: userInfo.user_id }} /> 
            {isInitalDeposit ? <CopyItemComponent item={{ label: "Mật khẩu mặc định", value: userInfo.password }} />  : ""}
            <div className={styles.userInfoSectionLink}><a href="https://www.ssvv388.com/" target="_blank">ĐẶT CƯỢC NGAY</a></div>
            <div style={{ color: "white", fontSize: "12px", maxWidth: "80%", margin: "auto", paddingTop: '5px', textAlign: 'center' }}>
              <i>* Nếu bạn quên</i>  &nbsp; mật khẩu vui lòng liên hệ chăm sóc khách hàng. <br />
              Bấm vào đây để được <CustomerSupportAnimatedItem />
            </div>
          </div>}
        <div className={styles.cockfightSectionOverlay}>
          <span>Daga</span>
          <div className={styles.cockfightSection}>
            <div><a href='https://www.ssvv388.com/' target="_blank"><img src={CockFightBanner} width={"75%"} /></a></div>
            <div style={{ padding: '0px 10px' }}>
              <h3 style={{ margin: '0px' }}>Đá gà SV388</h3>
              <p>Đá gà Thomo trực tuyến độc quyền tại SVW38.COM</p>
              <CoolAnimatedButton text="ĐẶT CƯỢC NGAY" link="https://www.ssvv388.com/" />
            </div>
          </div>
        </div>
        <div style={{ color: "rgb(219 152 15)", fontSize: "2em", margin: "5px 0px", paddingTop: "10px", fontFamily: 'Great Vibes', fontWeight: 'bold', textAlign: 'center' }}>Đá gà cựa sắt số 1</div>
      </div>
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
      {item.label !== 'Số điện thoại đăng nhập' &&
        <span className={styles.copyButton} onClick={onCopyClicked}>
          Copy <MdOutlineContentCopy style={{ marginLeft: "7px" }} />
        </span>}
    </div>
  )
}

export default Home