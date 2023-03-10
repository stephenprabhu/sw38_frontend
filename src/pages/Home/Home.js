import { Link } from "react-router-dom";
import BannerImage from "../../assets/Banner IMG.png"
import HomeImageMenu from '../../components/HomeImageMenu';
import Header from "../../components/Header";
import { useContext, useEffect } from "react";
import UserContext from "../../helpers/Context/user-context";
import CockFightBanner from "../../assets/sub-animal-sv.png";
import styles from './Home.module.css';
import CoolAnimatedButton from "../../components/CoolAnimatedButton";
import { MdOutlineContentCopy } from "react-icons/md";
import CustomerSupportAnimatedItem from "../../components/CustomerSupportAnimatedItem";
import { APIUser } from "../../helpers/APIs/UserAPIs";

const Home = () => {
  const ctx = useContext(UserContext);
  const userInfo = ctx.userInfo;
  const user = ctx.user;

  // getting url param value
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
          password: userApiData ? userApiData.raw_string : '-',
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
          ???? G?? SV388 N??I C??C CHI???N K?? HUY???N THO???I TH??? HI???N CH??? C?? T???I SVW38.COM
        </marquee>
        {!ctx.user ? <div className={styles.registerLoginSection}>
          <Link className={styles.loginButton} to='/login'>????ng Nh???p</Link>
          <Link className={styles.registerButton} to='/register'>????ng k??</Link>
        </div> : ""}
        <HomeImageMenu />
        {user && userInfo &&
          <div className={styles.userInfoSection}>
            {!isInitalDeposit ? <CopyItemComponent item={{ label: "S??? ??i???n tho???i ????ng nh???p", value: userInfo.name }} /> : ""}
            <CopyItemComponent item={{ label: "T??i kho???n SV388", value: userInfo.user_id }} />
            {isInitalDeposit ? <CopyItemComponent item={{ label: "M???t kh???u m???c ?????nh", value: userInfo.password }} /> : ""}
            <div className={styles.userInfoSectionLink}><a href="https://www.ssvv388.com/" target="_blank">?????T C?????C NGAY</a></div>
            <div style={{ color: "white", fontSize: "12px", maxWidth: "80%", margin: "auto", paddingTop: '5px', textAlign: 'center' }}>
              <i>* N???u b???n qu??n</i>  &nbsp; m???t kh???u vui l??ng li??n h??? ch??m s??c kh??ch h??ng. <br />
              B???m v??o ????y ????? li??n h??? <CustomerSupportAnimatedItem />
            </div>
          </div>}
        <div className={styles.cockfightSectionOverlay}>
          <span>???? g??</span>
          <div className={styles.cockfightSection}>
            <div><a href='https://www.ssvv388.com/' target="_blank"><img src={CockFightBanner} width={"75%"} /></a></div>
            <div style={{ padding: '0px 10px' }}>
              <h3 style={{ margin: '0px' }}>???? g?? SV388</h3>
              <p>???? g?? Thomo tr???c tuy???n ?????c quy???n t???i SVW38.COM</p>
              <CoolAnimatedButton text="?????T C?????C NGAY" link="https://www.ssvv388.com/" />
            </div>
          </div>
        </div>
        <div style={{ color: "rgb(219 152 15)", fontSize: "2em", margin: "5px 0px", paddingTop: "10px", fontFamily: 'Great Vibes', fontWeight: 'bold', textAlign: 'center' }}>???? g?? c???a s???t s??? 1</div>
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
      {item.label !== 'S??? ??i???n tho???i ????ng nh???p' &&
        <span className={styles.copyButton} onClick={onCopyClicked}>
          Copy <MdOutlineContentCopy style={{ marginLeft: "7px" }} />
        </span>}
    </div>
  )
}

export default Home