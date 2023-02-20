import { Link } from "react-router-dom";
import BannerImage from "../../assets/home_banner.png"
import HomeImageMenu from '../../components/HomeImageMenu';
import Header from "../../components/Header";
import BottomMenu from "../../components/BottomMenu";
import { useContext, useState } from "react";
import UserContext from "../../helpers/Context/user-context";
import CockFightBanner from "../../assets/sub-animal-sv.png"
import styles from './Home.module.css'
import CockFightBanner2 from "../../assets/da-ga-truc-tiep-baner.gif"


const Home = () => {
  const ctx = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);

  const getUserAccountInfo = () => {
    if(ctx.firstTimeLogin){

    }
  }


  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
        <Header />
        <div style={{flex: 1}}>
          <img src={BannerImage} width="100%" />
          {!ctx.user ? <div className='register-login-section'>
            <Link className='login-button' to='/login'>Đăng Nhập</Link>
            <Link className='register-button' to='/register'>Đăng ký</Link> 
          </div> : ""}
          <HomeImageMenu />
          <div className={styles.cockfightSection}>
            <div><img src={CockFightBanner} width={"75%"} /></div>
            <div>
              <h3>Đá gà SV388</h3>
              <p> được tường thuật trực tiếp. Kèo đấn kịch tính, hấp dẫn</p>
              <a href="/">Xem trực tiếp</a>
            </div>
          </div>
          {/* <img src={CockFightBanner2} width="90%" /> */}
        </div>
        <div>
          <BottomMenu />
        </div>

    </div>
  )
}

export default Home