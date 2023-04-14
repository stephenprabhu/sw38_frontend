import React, { useEffect } from 'react'
import captchas from '../data/captchas';
import styles from './CaptchaInput.module.css';

const CaptchaInput = ({ captcha, setCaptcha, userCaptchaInput, setUserCaptchaInput }) => {


  useEffect(() => {
    setCaptcha(captchas[Math.floor(Math.random() * captchas.length)]);
  }, []);

  return (
    <div className={styles.formInput}>
      <span>Mã xác nhận</span>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Mã xác nhận"
          name="captcha"
          className={styles.inputPhone}
          value={userCaptchaInput}
          required
          onChange={(e) => setUserCaptchaInput(e.currentTarget.value)}
        />
        <img src={captcha ? captcha.image : ""} width="100px" style={{ borderRadius: '5px 5px 0px 0px' }} alt='captcha'/>
      </div>
    </div>
  )
}

export default CaptchaInput