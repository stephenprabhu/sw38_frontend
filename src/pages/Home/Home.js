import { useContext, useEffect, useState } from "react";
import styles from './Home.module.css';
import BannerImage from "../../assets/Banner IMG.jfif";
import MainBannerImage from "../../assets/MainBannerImage.png"
import HomeImageMenu from '../../components/HomeImageMenu';
import Header from "../../components/Header";
import UserContext from "../../helpers/Context/user-context";
import CockFightBanner from "../../assets/sub-animal-sv.png";
import CoolAnimatedButton from "../../components/CoolAnimatedButton";
import CustomerSupportAnimatedItem from "../../components/CustomerSupportAnimatedItem";
import { Link } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import { APIUser } from "../../helpers/APIs/UserAPIs";
import { CircularProgress } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Home = () => {
  const ctx = useContext(UserContext);
  const userInfo = ctx.userInfo;
  const user = ctx.user;
  const [rejectRequest, setRejectRequest] = useState('')

  // getting url param value
  // const urlSearchParams = new URLSearchParams(window.location.search);
  // const params = Object.fromEntries(urlSearchParams.entries());
  // const isInitalDeposit = params && params.initial;

  // Refresh page user credentials API call
  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      userData()
    }
  }, []);

  // user Data
  const userData = async () => {
    const userApiData = await APIUser()
    if (userApiData.response && userApiData.response.data.message === "Unauthenticated.") {
      localStorage.removeItem('auth_token')
      ctx.setUser('');
    } else {
      ctx.setUserInfo({
        name: userApiData ? userApiData.phone : '-',
        user_id: userApiData && !userApiData.user_name ? userApiData.user_id : userApiData.user_name ? userApiData.user_name : '',
        password: userApiData ? userApiData.raw_string : '',
      });
    }
  }

  // get deposit time from localStorage
  const getDepositTime = localStorage.getItem('initialDeposit')
  const depositTime = new Date() - new Date(getDepositTime)
  
  return (
    <div className={styles.homeOverlay}>
      <Header />
      <div className={styles.homeWrapper}>
        <a href='https://www.ssvv388.com/' target="_blank" rel='noreferrer'>
          <img src={MainBannerImage} width="100%" alt="banner"/>
        </a>
        <a href='https://www.ssvv388.com/' target="_blank" rel='noreferrer'>
          <img src={BannerImage} width="100%" alt="banner"/>
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
          <div className={styles.homeMsg}>
            <CopyItemComponent item={{ label: "Số điện thoại đăng nhập", value: userInfo.name }} />
            {userInfo.user_id && <CopyItemComponent item={{ label: "Tài khoản SV388", value: userInfo.user_id }} />}
            {userInfo.user_id && <CopyItemComponent item={{ label: "Mật khẩu mặc định", value: userInfo.password }} />}
            {userInfo.user_id && 
              <div style={{ color: "#F7DB89", fontSize: "12px", maxWidth: "80%", margin: "auto", paddingTop: '5px', fontWeight: 600, textAlign:'center' }}>
                <i>* Nếu bạn đã thay đổi</i>  &nbsp; mật khẩu vui lòng liên hệ chăm sóc khách hàng.
              </div>
            }
            {!userInfo.user_id && !getDepositTime && !rejectRequest && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', textAlign:'center' }}>Để lấy tên tài khoản và mật khẩu. Vui lòng<br />Nạp Tiền kích hoạt tài khoản !</span>}
            {!userInfo.user_id && !getDepositTime && !rejectRequest && <Link to='/deposit' className={styles.depositButton} onClick={''}>Nạp Tiền</Link>}
            {/*!userInfo.user_id && isInitalDeposit && <span className={styles.depositWaitMsg}>Vui lòng chờ cấp tài khoản trong giây lát...</span>*/}
            {!userInfo.user_id && getDepositTime && depositTime > 600000 && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', paddingBottom: '7px',textAlign:'center' }}>Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!</span>}
            {!userInfo.user_id && getDepositTime && depositTime < 600000 && <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', color:'#F7DB89' }}><div><CircularProgress size={50} style={{color:"#DEB849"}}/></div><div >Vui lòng chờ cấp tài khoản trong giây lát…</div></div>}
            {/*Rejected Message*/}
            {rejectRequest && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', paddingBottom: '7px' }}>{rejectRequest}</span>}
          </div>
        }

        <div className={styles.customerSupportWrapper}>
          <div>Bấm vào đây để liên hệ</div>
          <div><CustomerSupportAnimatedItem /></div>
        </div>
        
        <div className={styles.cockfightSectionOverlay}>
          <span>Đá gà</span>
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

export default Home

const CopyItemComponent = ({ item, showHideOption = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onCopyClicked = () => {
    navigator.clipboard.writeText(item.value);
  }

  return (
    <div className={styles.bankDetailItem}>
      <div style={{ textAlign: "left" }}>
        <span className={`${styles.grayLabel} ${item.label === 'Số điện thoại đăng nhập' && styles.userNameLabel}`} >{item.label}</span><br />
        {!showHideOption ? <span className={`${styles.grayValue} ${item.label === 'Số điện thoại đăng nhập' && styles.userName}`}>{item.value}</span> : ""}
        {showHideOption ? <span className={styles.grayValue}>{showPassword ? item.value : item.value.replace(/./g, "*")}</span> : ""}
        {showHideOption ? <span>{showPassword ? <AiFillEye onClick={() => setShowPassword(false)} size={18} style={{ paddingLeft: "7px", position: 'relative', bottom: '-3px' }} /> : <AiFillEyeInvisible onClick={() => setShowPassword(true)} size={18} style={{ paddingLeft: "7px" }} />}</span> : ""}
      </div>
      {item.label === 'Số điện thoại đăng nhập' ? '' : <span className={styles.copyButton} onClick={onCopyClicked}>
        <span>Copy</span>
        <MdOutlineContentCopy size={18} />
      </span>}
    </div>
  )
}