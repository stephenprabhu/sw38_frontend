import React from 'react'
import Modal from '@mui/material/Modal';
import styles from "./PopupErrorModal.module.css";
import errorIcon from '../assets/Error.png';
import successIcon from '../assets/Success.png';

const PopupErrorModal = ({ message, show, hideModal, error = true }) => {
  return (
    <Modal
      open={show}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalOverlay} onClick={hideModal}>
        <div className={styles.loadingSection} onClick={(e) => e.stopPropagation()}>
          {error ? <img src={errorIcon} className={styles.errorImg} /> : <img src={successIcon} className={styles.errorImg} />}
          <div style={{ color: "white" }}>{message}</div>
        </div>
      </div>
    </Modal>
  )
}

export default PopupErrorModal