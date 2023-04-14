import styles from './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import Header from '../../components/Header';
import image from '../../assets/forgotPassword.png';
import customerSupport from '../../assets/24hours.png';
// import zalo from '../../assets/zalo.png';
// import telegram from '../../assets/telegram.png';

const text = [{ image: customerSupport, name: 'Hỗ trợ', supported: 'Liên hệ', link: 'https://tawk.to/chat/6401c6a14247f20fefe3bd2c/1gqjevpuk' }
  // , { image: telegram, name: 'Telegram', supported: 'Liên hệ', link: 'https://t.me/hotrosv388' }
  // , { image: zalo, name: '+84862641494', supported: 'Sao chép', link: 'https://zalo.me/0938046398' }
]

const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.forgotOverlay}>
      <Header />
      <div className={styles.forgotContentWrapper}>
        <div className={styles.imageSection}>
          <img src={image} width='100%' alt='forgotImg'/>
          <div className={styles.titleWrapper}>
            <IoArrowBack onClick={() => navigate("/login")} style={{ cursor: 'pointer' }} size={32} />
            <span>Đăng ký</span>
          </div>
        </div>
        <div className={styles.linkButtons}>
          <span className={styles.helperText}>Nếu quên mật khẩu, vui lòng liên hệ với chúng tôi bằng một trong những phương thức dưới đây để được hỗ trợ</span>
          {text.map((item) => (
            <button className={styles.buttonWrapper} key={item.name} onClick={() => window.open(item.link)}>
              <div className={styles.twoBtns}>
                <img src={item.image} width={30} alt={item.name}/>
                <span>{item.name}</span>
              </div>
              <div className={styles.lastBtn}>
                <span>{item.supported}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword