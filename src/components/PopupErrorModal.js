import React from 'react'
import { FcCancel } from "react-icons/fc";
import Modal from '@mui/material/Modal';
import styles from "./PopupErrorModal.module.css";


const PopupErrorModal = ({ message, show, hideModal }) => {
  return (
    <Modal
      open={show}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.loadingSection}>
        <FcCancel size={40} />
        <div style={{ color: "white" }}>{message}</div>
      </div>
    </Modal>
  )
}
// <a className={styles.myLink} onClick={hideModal}>Close</a>

export default PopupErrorModal