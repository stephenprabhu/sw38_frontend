import React, { useEffect } from 'react'
import captchas from '../data/captchas';
import styles from './CaptchaInput.module.css';

const CaptchaInput = ({ captcha, setCaptcha, userCaptchaInput, setUserCaptchaInput }) => {

  useEffect(() => {
    setCaptcha(captchas[Math.floor(Math.random() * captchas.length)]);
  }, []);

  return (
    <div>
      <div className={styles.requiredLabel}><span>*</span>Mã xác nhận</div>
      <div className={styles.captchaInput}>
        <input
          type="text"
          placeholder="Mã xác nhận"
          name="captcha"
          value={userCaptchaInput}
          required
          onChange={(e) => setUserCaptchaInput(e.currentTarget.value)}
        />
        <img src={captcha ? captcha.image : ""} width="100px" alt='captcha'/>
      </div>
    </div>
  )
}

export default CaptchaInput