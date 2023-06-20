import React, { useContext, useEffect, useState } from "react";
import styles from "../register/Register.module.css";
import { Link } from "react-router-dom";
import { APICheckIfPhoneExists, APIRegisterUser } from "../../helpers/APIs/UserAPIs";
import UserContext from "../../helpers/Context/user-context";
import RegisterPopupModal from "./RegisterPopupModal";
import CaptchaInput from "../../components/CaptchaInput";
import { BsCheckLg, BsX } from "react-icons/bs";
import Layout from "../../Layout/Layout";
// import { BiEdit } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import PopupErrorModal from "../../components/PopupErrorModal";
// import axios from "axios";

// let timerInterval = null;

//password validation if code
//password && password.length >= 10 && checkIfHasUpperCaseChar(password) && checkIfHasLowerCaseChar(password) && checkIfHasNumber(password) && !checkIfHasSpecialChar(password) &&password === passwordAgain

const Register = () => {
  const [phone, setPhone] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [randomCaptcha, setRandomCaptcha] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerModal, setRegisterModal] = useState('');
  const [registerResponse, setRegisterResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneValid, setPhoneValid] = useState(0);
  const [agentId, setAgentId] = useState('')
  const ctx = useContext(UserContext);
  // const [password, setPassword] = useState("");
  // const [passwordAgain, setPasswordAgain] = useState("");
  // const navigate = useNavigate();
  // const [passwordHidden, setPasswordHidden] = useState(false);
  // const [showRegisterModal, setShowRegisterModal] = useState(false);
  // const [timerTime, setTimerTime] = useState(60);

  // getting url param value
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  
  useEffect(() => {
    if(params && params.ag_id) {
      setAgentId(params.ag_id)
      localStorage.setItem('agID', params.ag_id)
    } else if ( localStorage.getItem('agID') ){
      setAgentId(localStorage.getItem('agID'))
    }
  },[])

 // check phone is exist or not 
  const checkPhone = async () => {
    if (phone.length !== 10) {
      setPhoneValid(false);
    }
    const res = await APICheckIfPhoneExists(phone);
    if (res) {
      setPhoneValid(2)
      setErrorMessage('Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ.')
    } else {
      setPhoneValid(1)
    }
  }

  // Handle Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha || captcha.trim().toLowerCase() !== randomCaptcha.value) {
      setErrorMessage("Mã xác nhận không hợp lệ");
      return;
    }
    if (phone && phone.length === 10) {
      setLoading(true);
      const x = await APIRegisterUser(phone, null, agentId);
      if (!x) {
        setRegisterModal("Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ.");
      } else {
        setRegisterResponse(x)
        localStorage.setItem("auth_token", x);
        localStorage.removeItem('agID')
        setRegisterModal("Tài khoản của bạn đã được tạo thành công. Để kích hoạt tài khoản vui lòng nạp tiền");
        ctx.setUser(x);
        // ctx.setUserInfo(null);
        // navigate("/deposit?initial=true");
      }
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (timerInterval && timerTime <= 0) {
  //     setTimerTime(-1);
  //     clearInterval(timerInterval);
  //   }
  // }, [timerTime]);

  const checkPhoneStart = (value) => {
    const x = value.charAt(0);
    if (x == 0) {
      return value;
    }
  };

  // const checkIfHasUpperCaseChar = (value) => {
  //   return /[A-Z]/.test(value);
  // };

  // const checkIfHasLowerCaseChar = (value) => {
  //   return /[a-z]/.test(value);
  // };

  // const checkIfHasSpecialChar = (value) => {
  //   const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,. <>\/?~]/;
  //   return specialChars.test(value);
  // };

  // const checkIfHasNumber = (value) => {
  //   return /\d/.test(value);
  // };
  // <div className={styles.inputPasswordArea }>
  //   <input
  //     value={agentId}
  //     readOnly
  //     className={`${styles.inputPhone}`}
  //   />
  //   {phoneValid === 1 && phone.length === 10 ? <BsCheckLg color="green" size={20} /> : phone.length == 0 ? '' : phoneValid === 2 || phone.length < 10 ? <BsX size={30} style={{cursor:'pointer'}} onClick={() => setPhone('')} /> : ''}
  // </div>

  return (
    <Layout>
      <div className={styles.registerWrapper}>
        <div className={styles.formOverlay}>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div className={styles.registerHeader}>Đăng ký</div>
            <div className={styles.registerFormbody}>
              {agentId && 
                <div className={styles.agentIdWrapper}>
                  <span>Mã giới thiệu</span>
                  <span>{agentId}</span>
                </div>
              }
                {errorMessage ? (
                  <span className={styles.error}>{errorMessage}</span>
                ) : (
                  ""
                )}
                <div>
                  <div className={styles.requiredLabel}><span>*</span>Số điện thoại</div>
                  <div className={`${styles.formInput} ${phoneValid === 1 && phone.length === 10 ? styles.successPhoneNumber : phone.length === 0 ? '' : phoneValid === 2 || phone.length < 10 || phone.length > 10 ? styles.errorPhoneNumber : ''}`}>
                    <input
                      onBlur={checkPhone}
                      disabled={loading}
                      type="number"
                      value={phone}
                      onChange={(e) => {setPhone(e.currentTarget.value); setErrorMessage('') }}
                      placeholder="Số điện thoại"
                      name="username"
                      required
                      className={`${styles.inputPhone}`}
                    />
                    {phoneValid === 1 && phone.length === 10 ? <BsCheckLg style={{marginRight:'10px'}} size={20} /> : phone.length === 0 ? '' : phoneValid === 2 || phone.length < 10 ? <BsX size={30} style={{marginRight:'10px', cursor:'pointer'}} onClick={() => setPhone('')} /> : ''}
                  </div>
                  {phone && !checkPhoneStart(phone) ? <span className={styles.error}>Sai quy cách SĐT</span> : ""}
                  {phone && phone.length !== 10 ? <span className={styles.error}>Vui lòng nhập 10 ký tự</span> : ""}

                </div>
                {/* <div className={styles.formInput}>
                  <span>Mật khẩu</span>
                  <p style={{ color: "#F7DB89", textAlign: "left", fontSize: "12px", fontStyle: "italic" }}>
                    Ví dụ : Daga123123 (chữ  <span style={{ color: "#8ee18e", display: "inline", fontWeight: "900" }}>"D"</span> viết IN HOA, không dấu)
                  </p>
                  <div className={styles.inputPasswordArea}>
                    <input
                      disabled={loading}
                      type={passwordHidden ? "password" : "text"}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      placeholder="Mật khẩu"
                      name="password"
                      required
                      className={styles.inputPassword}
                    />
                    {passwordHidden ? <FiEye onClick={() => setPasswordHidden(false)} size={25} className={styles.passwordEye} /> : <FiEyeOff onClick={() => setPasswordHidden(true)} size={25} className={styles.passwordEye} />}
                  </div>
                  {password ? (
                    <div style={{ marginTop: "7px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ marginBottom: "0px" }}>
                          {checkIfHasUpperCaseChar(password) ? <FcOk /> : <FcCancel />}
                        </span>
                        <span className={checkIfHasUpperCaseChar(password) ? styles.success : styles.error}
                        >
                          Mật khẩu phải có chữ IN HOA
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ marginBottom: "0px" }}>
                          {checkIfHasLowerCaseChar(password) ? (
                            <FcOk />
                          ) : (
                            <FcCancel />
                          )}
                        </span>
                        <span
                          className={
                            checkIfHasLowerCaseChar(password)
                              ? styles.success
                              : styles.error
                          }
                        >
                          Mật khẩu phải có chữ thường
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ marginBottom: "0px" }}>
                          {checkIfHasNumber(password) ? <FcOk /> : <FcCancel />}
                        </span>
                        <span
                          className={
                            checkIfHasNumber(password) ? styles.success : styles.error
                          }
                        >
                          Mật khẩu phải có số (0~ 9)
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ marginBottom: "0px" }}>
                          {password.length >= 10 ? <FcOk /> : <FcCancel />}
                        </span>
                        <span
                          className={
                            password.length >= 10 ? styles.success : styles.error
                          }
                        >
                          Có độ dài từ 10 ký tự trở lên
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ marginBottom: "0px" }}>
                          {!checkIfHasSpecialChar(password) ? <FcOk /> : <FcCancel />}
                        </span>
                        <span
                          className={
                            !checkIfHasSpecialChar(password)
                              ? styles.success
                              : styles.error
                          }
                        >
                          Không chứa ký tự đặc biệt, dấu cách
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.formInput}>
                  <span>Mật khẩu (Lặp lại)</span>
                  <div className={styles.inputPasswordArea}>
                    <input
                      disabled={loading}
                      type={passwordHidden ? "password" : "text"}
                      value={passwordAgain}
                      onChange={(e) => setPasswordAgain(e.currentTarget.value)}
                      placeholder="Mật khẩu"
                      name="password"
                      required
                      className={styles.inputPassword}
                    />
                    {passwordHidden ? <FiEye size={25} onClick={() => setPasswordHidden(false)} className={styles.passwordEye} /> : <FiEyeOff onClick={() => setPasswordHidden(true)} size={25} className={styles.passwordEye} />}

                  </div>

                  {passwordAgain && passwordAgain !== password ? <span className={styles.error}>Mật khẩu không phù hợp.</span> : ""}
                </div> */}
                {/* <div className={styles.formInput}>
                <span>Mã xác nhận</span>
                <div style={{ display: "flex" }}>
                  <input
                    disabled={loading}
                    type="text"
                    placeholder="Mã xác nhận"
                    name="captcha"
                    className={styles.inputPhone}
                    value={captcha}
                    required
                    onChange={(e) => setCaptcha(e.currentTarget.value)}
                  />
                  <img src={Captcha} width="100px" />
                </div>
              </div> */}
              <CaptchaInput captcha={randomCaptcha} setCaptcha={setRandomCaptcha} setUserCaptchaInput={setCaptcha} userCaptchaInput={captcha} />
              <button className={`${styles.registerButton} ${loading ? styles.loading : "" }`} type="submit">
                {loading ? "Đang tải" : "Đăng ký"}
              </button>
              <div className={styles.loginSection}>
                Bạn đã có tài khoản ?
                <Link to="/login" className={styles.loginLink}>
                  Đăng Nhập
                </Link>
              </div>
            </div>
          </form>
        </div>
        <RegisterPopupModal message={registerModal} show={registerModal ? true : false} hideModal={() => setRegisterModal('')} x={registerResponse} />
      </div>
    </Layout>
  );
};

export default Register;
