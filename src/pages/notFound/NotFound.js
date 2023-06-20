import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import NotFoundImg from '../../assets/walking-cock.gif';
import Layout from '../../Layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className={styles.notFoundOverlay}>
        <img src={NotFoundImg} width={100} style={{ borderBottom: '02px solid white', borderRadius: '5%', paddingBottom: '5px', paddingLeft: '5px' }} alt='notfoundImg'/>
        <h3 style={{ color: "white" }}> Trang mà bạn đang tìm kiếm không tồn tại. </h3>
        <div ><Link to="/" style={{ color: "orange", textDecoration: "none" }}>Nhấn vào đây để trở về</Link></div>
        <div className={styles.wrap}>
          <Link to="/"><button className={styles.animbutton}>Trang chủ</button></Link>
        </div>
        <div style={{ color: "white", marginTop: "10px" }}>Bạn có thể nhấn vào dưới đây để liên hệ với bộ phận hỗ trợ khách hàng.</div>
        <CustomerSupportAnimatedItem />
      </div>
    </Layout>
  )
}

export default NotFound