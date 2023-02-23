import React from 'react'
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styles from "../register/Register.module.css";

const RegisterPopupModal = ({show, hideModal, timerTime}) => {

    console.log(timerTime)



  return (
    <Modal
        open={show}
        onClose={(e, reason ) => {
            if(reason && reason == "backdropClick" && timerTime >=0) 
                return;
            hideModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div>
              {timerTime >= 0 ? (
                <div className={styles.loadingSection}>
                  <h3 style={{ color: "white" }}><span>{timerTime}</span></h3>
                  <div>
                    <div
                      className={styles.loadingHeading}
                      style={{ marginLeft: "20px", color: "white" }}
                    >
                      Đang tạo tài khoản của bạn. Vui lòng chờ.
                    </div>
                    <span>Quá trình này sẽ mất tối đa 60 giây</span>
                  </div>
                </div>
              ) : (
                <div className={styles.loadingSection}>
                  <span className={styles.failedError}>Quá trình tạo tài khoản đang mất nhiều thời gian hơn dự kiến.</span>
                  <span className={styles.failedError}>Vui lòng đợi thêm một phút hoặc liên hệ CSKH</span>
                  <a href="https://direct.lc.chat/14707113/" target="_blank" className={styles.myLink}>Hỗ Trợ 24/7</a>
                </div>
              )}
        </div>
    </Modal>
  )
}

export default RegisterPopupModal