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
import Download from '../../components/Download';

const Home = () => {
  const ctx = useContext(UserContext);
  const userInfo = ctx.userInfo;
  const user = ctx.user;
  console.log(userInfo)
  const [downloadButtons, setDownloadButtons] = useState(true)

  // Refresh page user credentials API call
  useEffect(() => {
    const userData = async () => {
      const userApiData = await APIUser()
      if (userApiData.response && userApiData.response.data.message === "Unauthenticated.") {
        localStorage.removeItem('auth_token')
        ctx.setUser('');
      } else {
        ctx.setUserInfo({
          name: userApiData && userApiData.phone,
          password: userApiData && userApiData.password,
        });
      }
    }
    if (!userInfo && localStorage.getItem('auth_token')) {
      userData()
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", position: "relative" }}>
      {downloadButtons && <Download setDownloadButtons={setDownloadButtons} />}
      <Header />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <a href='https://www.ssvv388.com/' target="_blank">
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
            <CopyItemComponent item={{ label: "Số điện thoại đăng nhập", value: userInfo.name }} />
            <CopyItemComponent item={{ label: "Mật khẩu mặc định", value: userInfo.password }} showHideOption={true} />
            <div style={{ color: "white", fontSize: "12px", maxWidth: "80%", margin: "auto", paddingTop: '5px' }}>
              <i>* Nếu bạn đã thay đổi</i>  &nbsp; mật khẩu vui lòng liên hệ chăm sóc khách hàng. <br />
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
              {/* <a href="https://www.ssvv388.com/" target="_blank" className={styles.myLink}>ĐẶT CƯỢC NGAY</a> */}
              <CoolAnimatedButton text="ĐẶT CƯỢC NGAY" link="https://www.ssvv388.com/" />
            </div>
          </div>
        </div>
        <div style={{ color: "rgb(219 152 15)", fontSize: "2em", margin: "5px 0px", paddingTop: "10px", fontFamily: 'Great Vibes', fontWeight: 'bold' }}>Đá gà cựa sắt số 1</div>
      </div>
      <BottomMenu />
    </div>
  )
}

const CopyItemComponent = ({ item, showHideOption = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onCopyClicked = () => {
    navigator.clipboard.writeText(item.value);
  }
  return (
    <div className={styles.bankDetailItem}>
      <div style={{ textAlign: "left" }}>
        <span className={styles.grayLabel}>{item.label}</span><br />
        {!showHideOption ? <span className={styles.grayValue}>{item.value}</span> : ""}
        {showHideOption ? <span className={styles.grayValue}>{showPassword ? item.value : item.value.replace(/./g, "*")}</span> : ""}
        {showHideOption ? <span style={{ paddingLeft: "10px" }}>{showPassword ? <FiEye onClick={() => setShowPassword(false)} /> : <FiEyeOff onClick={() => setShowPassword(true)} />}</span> : ""}
      </div>
      <span className={styles.copyButton} onClick={onCopyClicked}>
        Copy <MdOutlineContentCopy style={{ marginLeft: "7px" }} />
      </span>
    </div>
  )
}

export default Home