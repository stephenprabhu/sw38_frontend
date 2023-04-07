import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { APICheckIfPhoneExists, APILoginUser } from '../../helpers/APIs/UserAPIs';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../helpers/Context/user-context';
import { FiLogOut, FiEyeOff, FiEye } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CircularProgress } from '@mui/material';
import LoginPopupModal from'./LoginPopupModal';
import CoolAnimatedButton from "../../components/CoolAnimatedButton";

const Login = () => {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [addPassword, setAddPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [popupError, setPopupError] = useState('');
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  // No of requests for login
  useEffect(() => {
    if (localStorage.getItem('loginRequest')) {
      setCount(localStorage.getItem('loginRequest'))
    }
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (phone && phone.length === 10 && !addPassword) {
      const checkPhone = await APICheckIfPhoneExists(phone)
      console.log(checkPhone)
      if (checkPhone) {
        setAddPassword(true)
      } else {
        setErrorMessage("Tài khoản không tồn tại. Vui lòng tạo tài khoản mới");
      }
    } else if (phone && addPassword && password) {
      if (count < 5) {
        setLoading(true)
        const x = await APILoginUser(phone, password);
        if (!x) {
          setCount(prevCount => prevCount + 1);
          // error for 5 times
          localStorage.setItem('loginRequest', count + 1)
          setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
          setLoading(false)
        } else if (x === 'serverError') {
          setErrorMessage("Đã xảy ra lỗi trong quá trình kết nối tới hệ thống. Vui lòng liên hệ Chăm sóc khách hàng");
          setLoading(false)
        } else if (x === 'invalidPhone') {
          setErrorMessage("Tài khoản bạn vừa nhập không tồn tại. Vui lòng tạo tài khoản hoặc liên hệ Chăm sóc khách hàng để được hỗ trợ");
          setLoading(false)
        } else {
          localStorage.removeItem('loginRequest')
          localStorage.setItem('auth_token', x);
          ctx.setUser(x);
          ctx.setUserInfo(null);
          setLoading(false)
          navigate("/");
        }
      } else {
        setPopupError('Bạn đã nhập sai mật khẩu quá 5 lần. Vui lòng liên hệ Chăm sóc khách hàng')
      }
    }
  }

  return (
    <div className={styles.loginOverlay}>
      <Header />
      <div className={styles.loginContentWrapper}>
        <div className={styles.titleWrapper}>
          <FiLogOut size={30} />
          <h3>Đăng Nhập</h3>
        </div>
        <div className={styles.formOverlay}>
          <form className={styles.loginForm} onSubmit={onSubmitHandler}>
            {addPassword && <AiOutlineArrowLeft color='#F7DB89' size={20} onClick={() => { setAddPassword(''); setPassword('') }} style={{ cursor: 'pointer' }} />}
            {!addPassword && 
              <div className={styles.formInput}>
                <span>Số điện thoại</span>
                <input type="number" value={phone} onChange={e => setPhone(e.currentTarget.value)} placeholder='Số điện thoại' name='username' className={styles.inputPhone} required />
              </div>
            }
            {phone && phone.length !== 10 ? <span className={styles.error}>Vui lòng nhập 10 ký tự</span> : ""}
            
            {addPassword && 
              <div className={styles.formInput}>
                <span>Mật khẩu</span>
                <div className={styles.inputPasswordWrapper}>
                  <input type={passwordHidden ? "text" : "password"} placeholder='điền mật khẩu chính xác đã thay đổi trên sv388' name='username' value={password} onChange={e => setPassword(e.currentTarget.value)} className={styles.inputPhone} required />
                  {passwordHidden ? <FiEye onClick={() => setPasswordHidden(false)} size={20} className={styles.passwordEye} /> : <FiEyeOff onClick={() => setPasswordHidden(true)} size={20} className={styles.passwordEye} />}
                </div>
              </div>
            }
            {errorMessage && <span className={styles.error}>{errorMessage}</span>}

            <div className={styles.forgotPassword}>
              <div onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</div>
            </div>

            {loading && 
              <div className={styles.apiResponseLoader}>
                <div><CircularProgress  style={{'color': '#F7DB89'}}/></div>
                <div>Đang lấy thông tin tài khoản, vui lòng chờ trong giây lát!</div>
              </div>
            }

            <button className={`${styles.loginButton} ${loading ? styles.loading : ""}`} type="submit">{loading ? "Đang tải" : "Đăng Nhập"}</button>
            <div className={styles.loginSection}>
              Bạn chưa có tài khoản ? <Link to="/register" className={styles.loginLink}>Đăng ký</Link>
            </div>
          </form>

          <div style={{ margin: '5px', color: '#F7DB89' }}>
            <p>Nếu đã có tài khoản nhấn vào đây để chơi ngay</p>
            <CoolAnimatedButton text="ĐẶT CƯỢC NGAY" link="https://sfv388.com/" />
          </div>
          
          <LoginPopupModal message={popupError} show={popupError ? true : false} hideModal={() => { setPopupError(''); setCount(0); localStorage.removeItem('loginRequest') }} />
        </div>
      </div>
    </div>
  )
}

export default Login