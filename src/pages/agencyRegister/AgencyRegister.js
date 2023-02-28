import React, { useContext, useEffect, useState } from "react";
// import styles from "../register/Register.module.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { APICheckIfPhoneExists, APIRegisterAgent } from "../../helpers/APIs/UserAPIs";
import UserContext from "../../helpers/Context/user-context";
import { useNavigate } from "react-router-dom";
import BottomMenu from "../../components/BottomMenu";
import { FcOk, FcCancel } from "react-icons/fc";
import { FiEyeOff, FiEye } from "react-icons/fi";
import PopupErrorModal from "../../components/PopupErrorModal";
import { BsCheckLg } from "react-icons/bs";
import { BsX } from 'react-icons/bs';
import vietnamBankArray from '../../data/vn-banks'
import styles from './AgencyRegister.module.css';
import { CiCreditCard1 } from "react-icons/ci";
import CaptchaInput from "../../components/CaptchaInput";
import { IoArrowBack } from "react-icons/io5";


let timerInterval = null;


const AgencyRegister = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [randomCaptcha, setRandomCaptcha] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [timerTime, setTimerTime] = useState(60);
  const [phoneValid, setPhoneValid] = useState(0);
  const [bankName, setBankName] = useState(vietnamBankArray[0]);
  const [accNumber, setAccNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);



  const registerUser = async (e) => {
    e.preventDefault();
    if (!captcha || captcha.trim().toLowerCase() !== randomCaptcha.value) {
      setErrorMessage("Mã xác nhận không hợp lệ");
      return;
    }

    if (
      password && password.length >= 10
      && checkIfHasUpperCaseChar(password)
      && checkIfHasLowerCaseChar(password)
      && checkIfHasNumber(password)
      && !checkIfHasSpecialChar(password)
      && password === passwordAgain
      && bankName && accNumber && userName
    ) {
      setLoading(true);
      setShowRegisterModal(true);
      timerInterval = setInterval(() => setTimerTime((pt) => { return pt - 1; }), 1000);
      const x = await APIRegisterAgent(phone, password, bankName, accNumber, userName);
      if (!x) {
        setErrorMessage("Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ.");
        setShowRegisterModal(false);
      } else {
        setShowSuccessModal(true)
        // navigate("/");

      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (timerInterval && timerTime <= 0) {
      setTimerTime(-1);
      clearInterval(timerInterval);
    }
  }, [timerTime]);

  const checkPhoneStart = (value) => {
    const x = value.charAt(0);
    if (x == 0) {
      return value;
    }
  };

  const checkIfHasUpperCaseChar = (value) => {
    return /[A-Z]/.test(value);
  };

  const checkIfHasLowerCaseChar = (value) => {
    return /[a-z]/.test(value);
  };

  const checkIfHasSpecialChar = (value) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,. <>\/?~]/;
    return specialChars.test(value);
  };

  const checkIfHasNumber = (value) => {
    return /\d/.test(value);
  };


  const checkPhone = async () => {
    const res = await APICheckIfPhoneExists(phone);
    if (res) {
      setPhoneValid(2)
      setErrorMessage('Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ.');
    } else {
      setPhoneValid(1)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <Header />
      <div style={{ flex: 1, overflow: "auto", paddingBottom: "30px" }}>
        <form className={styles.registerForm} onSubmit={registerUser}>
          <h1 className={styles.title} onClick={() => navigate("/promotions")}><IoArrowBack /> <span style={{ paddingLeft: "10px" }}>Đăng ký Đại lý</span></h1>
          {errorMessage ? <span className={styles.error}>{errorMessage}</span> : ""}
          <div className={`${styles.formInput}`}>
            <span>Số điện thoại</span>
            <div className={`${styles.inputPasswordArea} ${phoneValid === 1 && phone.length === 10 ? styles.successPhoneNumber : phone.length == 0 ? '' : phoneValid === 2 || phone.length < 10 ? styles.errorPhoneNumber : ''}`}>
              <input
                onBlur={checkPhone}
                disabled={loading}
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                placeholder="Số điện thoại"
                name="username"
                required
                className={`${styles.inputPhone}`}
              />
              {phoneValid === 1 && phone.length === 10 ? <BsCheckLg color="green" size={20} /> : phone.length == 0 ? '' : phoneValid === 2 || phone.length < 10 ? <BsX size={30} onClick={() => setPhone('')} /> : ''}
            </div>
            {phone && !checkPhoneStart(phone) ? <span className={styles.error}>Sai quy cách SĐT</span> : ""}
          </div>
          <div className={styles.formInput}>
            <span>Mật khẩu</span>
            <p style={{ color: "white", textAlign: "left", fontSize: "12px", fontStyle: "italic" }}>
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

            {passwordAgain && passwordAgain !== password ? (
              <span className={styles.error}>Mật khẩu không phù hợp.</span>
            ) : (
              ""
            )}
          </div>
          <div className={styles.formInput}>
            <span className={styles.label}>Ngân hàng</span>
            <select className={styles.select} required value={bankName} onChange={(e) => setBankName(e.target.value)}>
              {vietnamBankArray.map((val, index) => <option key={index}>{val}</option>)}
            </select>
          </div>
          <span className={styles.label}>Tên tài khoản</span>
          <p style={{ color: "white", textAlign: "left", fontSize: "12px", fontStyle: "italic" }}>
            Tên tài khoản viết IN HOA, không dấu
          </p>
          <div className={styles.inputItem}>
            <input className={styles.whiteInput} style={{ border: "none" }} placeholder="＊ Tên tài khoản" required value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <span className={styles.label}>Số tài khoản</span>
          <div className={styles.inputItem}>
            <CiCreditCard1 size={25} style={{ color: "gray" }} />
            <input className={styles.whiteInput} style={{ border: "none" }} placeholder="＊ Vui lòng nhập số tài khoản" required value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
          </div>
          <CaptchaInput captcha={randomCaptcha} setCaptcha={setRandomCaptcha} setUserCaptchaInput={setCaptcha} userCaptchaInput={captcha} />
          <button
            className={`${styles.registerButton} ${loading ? styles.loading : ""
              }`}
            type="submit"
          >
            {loading ? "Đang tải" : "Đăng ký"}
          </button>
        </form>
        <PopupErrorModal message={"We have recieved your information. We will contact you within 48 hours."} show={showSuccessModal} hideModal={() => setShowSuccessModal(false)} error={false} />
      </div>
      <BottomMenu />
    </div>
  )
}

export default AgencyRegister