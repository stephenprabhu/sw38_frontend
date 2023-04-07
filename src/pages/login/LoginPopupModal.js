import Modal from '@mui/material/Modal';
import styles from "./LoginPopupModal.module.css";
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import { IoClose } from "react-icons/io5";

const LoginPopupModal = ({ show, hideModal, message }) => {

  return (
    <Modal
      open={show}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalOverlay} onClick={hideModal}>
        <div className={styles.errorContainer}>
          <div className={styles.modalContentWrapper}>
            <div style={{ textAlign: 'right' }}><IoClose size={32} style={{ cursor: 'pointer' }} /></div>
            <div style={{ fontSize: '20px' }}>{message}</div>
            <div style={{ width: '70%', margin: 'auto' }}>
              <CustomerSupportAnimatedItem />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LoginPopupModal