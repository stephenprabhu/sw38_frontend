import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import NotFoundImg from '../../assets/walking-cock.gif';

const NotFound = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <Header />
      <div style={{ width: "80%", margin: 'auto', textAlign: 'center' }}>
        <img src={NotFoundImg} width={100} style={{ borderBottom: '02px solid white', borderRadius: '5%', paddingBottom: '5px', paddingLeft: '5px' }} />
        <h3 style={{ color: "white" }}> Trang mà bạn đang tìm kiếm không tồn tại. </h3>
        <div ><Link to="/" style={{ color: "orange", textDecoration: "none" }}>Nhấn vào đây để trở về</Link></div>
        <div className={styles.wrap}>
          <Link to="/"><button className={styles.animbutton}>Trang chủ</button></Link>
        </div>
        <div style={{ color: "white", marginTop: "10px" }}>Bạn có thể nhấn vào dưới đây để liên hệ với bộ phận hỗ trợ khách hàng.</div>
        <CustomerSupportAnimatedItem />
      </div>
    </div>
  )
}

export default NotFound