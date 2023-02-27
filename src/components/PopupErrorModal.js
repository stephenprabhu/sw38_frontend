import React from 'react'
import { FcCancel } from "react-icons/fc";
import Modal from '@mui/material/Modal';
import styles from "./PopupErrorModal.module.css";
import { SlInfo } from "react-icons/sl";


const PopupErrorModal = ({ message, show, hideModal, error = true }) => {
  return (
    <Modal
      open={show}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.loadingSection}>
        {error ? <FcCancel size={40} /> : <SlInfo size={40} style={{color:"green"}} />}
        <div style={{ color: "white" }}>{message}</div>
      </div>
    </Modal>
  )
}
// <a className={styles.myLink} onClick={hideModal}>Close</a>

export default PopupErrorModal