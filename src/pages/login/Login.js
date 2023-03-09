import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { APILoginUser } from '../../helpers/APIs/UserAPIs';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../helpers/Context/user-context';
import { FiLogOut, FiEyeOff, FiEye } from "react-icons/fi";

const Login = () => {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!phone || phone.length !== 10) {
      setErrorMessage("phone must be 10 digits");
      return;
    }
    setLoading(true)
    const x = await APILoginUser(phone, password);
    if (!x) {
      setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
    } else {
      localStorage.setItem('auth_token', x);
      ctx.setUser(x);
      ctx.setUserInfo(null);
      setLoading(false)
      navigate("/");
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
            {errorMessage ? <span className={styles.error}>{errorMessage}</span> : ""}
            <div className={styles.formInput}>
              <span>Số điện thoại</span>
              <input type="number" value={phone} onChange={e => setPhone(e.currentTarget.value)} placeholder='Số điện thoại' name='username' className={styles.inputPhone} required />
              {phone && phone.length !== 10 ? <span className={styles.error}>Vui lòng nhập 10 ký tự</span> : ""}
            </div>
            <div className={styles.formInput}>
              <span>Mật khẩu</span>
              <div style={{ display: 'flex', position: 'relative' }}>
                <input type={passwordHidden ? "text" : "password"} placeholder='Vui lòng nhập mật khẩu' name='username' value={password} onChange={e => setPassword(e.currentTarget.value)} className={styles.inputPhone} required />
                {passwordHidden ? <FiEye onClick={() => setPasswordHidden(false)} size={20} className={styles.passwordEye} /> : <FiEyeOff onClick={() => setPasswordHidden(true)} size={20} className={styles.passwordEye} />}
              </div>
            </div>
            <button className={`${styles.loginButton} ${loading ? styles.loading : ""}`} type="submit">{loading ? "Đang tải" : "Đăng Nhập"}</button>
          </form>
          <div className={styles.loginSection}>
            Bạn chưa có tài khoản ? <Link to="/register" className={styles.loginLink}>Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login