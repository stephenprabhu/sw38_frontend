import React from 'react'
import BottomMenu from '../../components/BottomMenu'
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import CoolAnimatedButton from '../../components/CoolAnimatedButton'
import styles from './NotFound.module.css';


const NotFound = () => {
  return (
    <div  style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <Header />
        <div  style={{width:"80%", margin:'auto'}}>
            <h3 style={{color:"white"}}> Trang mà bạn đang tìm kiếm không tồn tại. </h3>
            <div ><Link to="/" style={{color: "orange", textDecoration:"none"}}>Nhấn vào đây để trở về</Link></div>
            <div className={styles.wrap}>
                <Link to="/"><button className={styles.animbutton}>Trang chủ</button></Link>
            </div>
            <div style={{color:"white", marginTop:"10px"}}>Bạn có thể nhấn vào dưới đây để liên hệ với bộ phận hỗ trợ khách hàng.</div>
            <CustomerSupportAnimatedItem />
        </div> 
        <BottomMenu />
    </div>
  )
}

export default NotFound