import { Link } from "react-router-dom";
import BannerImage from "../../assets/home_banner.png"
import HomeImageMenu from '../../components/HomeImageMenu';
import Header from "../../components/Header";
import BottomMenu from "../../components/BottomMenu";
import { useContext } from "react";
import UserContext from "../../helpers/Context/user-context";

const Home = () => {
  const ctx = useContext(UserContext);

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
        </div>
        <div>
          <BottomMenu />
        </div>

    </div>
  )
}

export default Home