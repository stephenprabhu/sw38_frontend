import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { APILoginUser } from '../../helpers/APIs/UserAPIs';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../helpers/Context/user-context';
import BottomMenu from '../../components/BottomMenu';

const Login = () => {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const ctx = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!phone || phone.length !== 10) {
      setErrorMessage("phone must be 10 digits");
      return;
    }
    const x = await APILoginUser(phone, password);
    if (!x) {
      setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
    } else {
      localStorage.setItem('auth_token', x);
      ctx.setUser(x);
      ctx.setUserInfo({
        name: phone,
        password: password,
      });
      navigate("/");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <Header />
      <div style={{ flex: 1 }}>
        <form className={styles.registerForm} onSubmit={onSubmitHandler}>
          <h1 className={styles.title}>Đăng Nhập</h1>
          {errorMessage ? <span className={styles.error}>{errorMessage}</span> : ""}
          <div className={styles.formInput}>
            <span>Số điện thoại</span>
            <input type="number" value={phone} onChange={e => setPhone(e.currentTarget.value)} placeholder='Số điện thoại' name='username' className={styles.inputPhone} required />
            {phone && phone.length !== 10 ? <span className={styles.error}>Vui lòng nhập 10 ký tự</span> : ""}
          </div>
          <div className={styles.formInput}>
            <span>Mật khẩu</span>
            <input type="password" placeholder='Vui lòng nhập mật khẩu' name='username' value={password} onChange={e => setPassword(e.currentTarget.value)} className={styles.inputPhone} required />
          </div>
          <button className={`${styles.registerButton} ${loading ? styles.loading : ""}`} type="submit">{loading ? "Đang tải" : "Đăng Nhập"}</button>
        </form>

        <div className={styles.loginSection}>
          Bạn chưa có tài khoản ? <Link to="/register" className={styles.loginLink}>Đăng ký</Link>
        </div>
      </div>
      <div>
        <BottomMenu />
      </div>
    </div>
  )
}

export default Login