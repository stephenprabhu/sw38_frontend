import styles from './Footer.module.css';
import { FaDollarSign } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDollarCircle } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { ImHome } from "react-icons/im";

// import { TfiGift } from "react-icons/tfi";
// {icon: <TfiGift size={20}/>, name:'Khuyến mãi', link: '/'}, 

const footerItems = [{icon: <ImHome size={26}/>, name:'Trang Chủ', link: '/'}, 
  {icon: <FaDollarSign size={20}/>, name:'Nạp Tiền', link: '/deposit'}, {icon: <AiOutlineDollarCircle size={22}/>, name:'Rút Tiền', link: '/withdraw'}, 
  {icon: <TfiHeadphoneAlt size={20}/>, name:'Hỗ Trợ', link: 'https://tawk.to/chat/6401c68c31ebfa0fe7f07069/1gqjev5o0'}, {icon: <CgProfile size={22}/>, name:'Tài Khoản', link: '/profile'}]

const BottomMenu = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.bottomMenuLayout}>
      {footerItems.map(item => (
        <div className={styles.menuItem} onClick={() => {item.name == 'Hỗ Trợ' ? window.open(item.link) : navigate(item.link)}} key={item.name}>
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomMenu