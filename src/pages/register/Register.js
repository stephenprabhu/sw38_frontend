import React, { useContext, useEffect, useState } from 'react'
import styles from '../register/Register.module.css'
import { Link } from 'react-router-dom';
import Captcha from "../../assets/svcaptcha.png"
import Header from '../../components/Header';
import { APIRegisterUser } from '../../helpers/APIs/UserAPIs';
import UserContext from '../../helpers/Context/user-context';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';
import CircularProgress from '@mui/material/CircularProgress';
import { FcOk, FcCancel } from "react-icons/fc";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!captcha || captcha.trim().toLowerCase() !== "svw38") {
      setErrorMessage("Mã xác nhận không hợp lệ");
      return;
    }
    if (phone && phone.length === 10 && password && password.length >= 10 && checkIfHasLowerCaseChar(password) && checkIfHasNumber(password) && !checkIfHasSpecialChar(password) && password === passwordAgain) {
      const x = await APIRegisterUser(phone, password);
      if (!x) {
        setErrorMessage("Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ.");
      } else {
        localStorage.setItem('auth_token', x);
        ctx.setUser(x);
        ctx.setUserInfo({
          name: phone,
          password: password,
          balance: "0.0"
        });
        navigate("/");
      }
    }
    setLoading(false);
  }

  const checkPhoneStart = (value) => {
    const x = value.charAt(0)
    if (x == 0) {
      return value
    }
  }

  const checkIfHasUpperCaseChar = (value) => {
    return /[A-Z]/.test(value);
  }

  const checkIfHasLowerCaseChar = (value) => {
    return /[a-z]/.test(value);
  }

  const checkIfHasSpecialChar = (value) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,. <>\/?~]/;
    return specialChars.test(value);
  }

  const checkIfHasNumber = value => {
    return /\d/.test(value);
  }

  // { password && password.length < 10 ? <span className={styles.error}>Mật khẩu phải từ 10 ký tự trở lên.</span> : "" }
  // { password && checkIfHasSpecialChar(password) ? <span className={styles.error}>Mật khẩu không được có bất kỳ ký tự đặc biệt hoặc dấu cách nào.</span> : "" }
  // { password && !checkIfHasUpperCaseChar(password) ? <span className={styles.error}>Mật khẩu phải có ít nhất một chữ hoa </span> : "" }
  // { password && !checkIfHasLowerCaseChar(password) ? <span className={styles.error}>Mật khẩu phải chứa ít nhất một chữ cái viết thường</span> : "" }
  // { password && !checkIfHasNumber(password) ? <span className={styles.error}>Mật khẩu phải chứa ít nhất một chữ số</span> : "" }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <Header />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <form className={styles.registerForm} onSubmit={registerUser}>
          <h1 className={styles.title}>Đăng ký</h1>
          {errorMessage ? <span className={styles.error}>{errorMessage}</span> : ""}
          <div className={styles.formInput}>
            <span>Số điện thoại</span>
            <input disabled={loading} type="number" value={phone} onChange={e => setPhone(e.currentTarget.value)} placeholder='Số điện thoại' name='username' required className={styles.inputPhone} />
            {phone && !checkPhoneStart(phone) ? <span className={styles.error}>Sai quy cách SĐT</span> : ""}
            {phone && phone.length !== 10 ? <span className={styles.error}>Vui lòng nhập 10 ký tự</span> : ""}
          </div>
          <div className={styles.formInput}>
            <span>Mật khẩu</span>
            <input disabled={loading} type="text" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder='Mật khẩu' name='password' required className={styles.inputPhone} />
            <p style={{ color: 'white', textAlign: 'left', fontSize: '12px' }} >Ví Dụ : Dagasv3888 ( Chữ "D" viết in hoa )</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ marginBottom: '0px' }}>{password && !password.length < 10 ? <FcOk /> : <FcCancel />}</span>
              <span className={styles.error}>Mật khẩu phải từ 10 ký tự trở lên.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ marginBottom: '0px' }}>{password && !checkIfHasSpecialChar(password) ? <FcOk /> : <FcCancel />}</span>
              <span className={styles.error}>Mật khẩu không được có bất kỳ ký tự đặc biệt hoặc dấu cách nào.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ marginBottom: '0px' }}>{password && checkIfHasUpperCaseChar(password) ? <FcOk /> : <FcCancel />}</span>
              <span className={styles.error}>Mật khẩu phải có ít nhất một chữ hoa </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ marginBottom: '0px' }}>{password && checkIfHasLowerCaseChar(password) ? <FcOk /> : <FcCancel />}</span>
              <span className={styles.error}>Mật khẩu phải chứa ít nhất một chữ cái viết thường</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ marginBottom: '0px' }}>{password && checkIfHasNumber(password) ? <FcOk /> : <FcCancel />}</span>
              <span className={styles.error}>Mật khẩu phải chứa ít nhất một chữ số</span>
            </div>

          </div>
          <div className={styles.formInput}>
            <span>Mật khẩu (Lặp lại)</span>
            <input disabled={loading} type="text" value={passwordAgain} onChange={e => setPasswordAgain(e.currentTarget.value)} placeholder='Mật khẩu' name='password' required className={styles.inputPhone} />
            {passwordAgain && passwordAgain !== password ? <span className={styles.error}>Mật khẩu không phù hợp.</span> : ""}
          </div>
          <div className={styles.formInput}>
            <span>Mã xác nhận</span>
            <div style={{ display: "flex" }}>
              <input
                disabled={loading}
                type="text"
                placeholder='Mã xác nhận'
                name='captcha'
                className={styles.inputPhone}
                value={captcha}
                onChange={(e) => setCaptcha(e.currentTarget.value)}
              />
              <img src={Captcha} width="100px" />
            </div>
          </div>
          {loading ?
            <div className={styles.loadingSection}>
              <CircularProgress />
              <div>
                <div className={styles.loadingHeading} style={{ marginLeft: "20px", color: "white" }}>Đang tạo tài khoản của bạn. Vui lòng chờ.</div>
                <span>Quá trình này sẽ mất tối đa 60 giây</span>
              </div>

            </div> : ""}
          <button className={`${styles.registerButton} ${loading ? styles.loading : ""}`} type="submit">{loading ? "Đang tải" : "Đăng ký"}</button>
        </form>

        <div className={styles.loginSection}>
          Đăng Nhập <Link to="/login" className={styles.loginLink}>Đăng Nhập</Link>
        </div>
      </div>
      <BottomMenu />

    </div>
  )
}

export default Register