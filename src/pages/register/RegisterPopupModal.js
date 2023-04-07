import Modal from '@mui/material/Modal';
import styles from "./RegisterPopupModal.module.css";
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import Success from '../../assets/Success.png';
import registerError from '../../assets/registerError.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../helpers/Context/user-context';

const RegisterPopupModal = ({ show, hideModal, message, x }) => {

  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const isErrorMessage = message === 'Số điện thoại này đã được đăng ký vui lòng liên hệ CSKH để được hỗ trợ.';

  const goDeposit = () => {
    ctx.setUser(x);
    navigate('/deposit')
  }

  return (
    <Modal open={show}>
      <div className={styles.modalOverlay} onClick={isErrorMessage && hideModal}>
        <div className={isErrorMessage ? styles.errorContainer : styles.successContainer} onClick={(e) => e.stopPropagation()}>
          {isErrorMessage ?
            <div className={styles.imageWrapper}>
              <img src={registerError} className={styles.image} />
            </div>
            :
            <div className={styles.imageWrapper}>
              <img src={Success} className={styles.image} />
            </div>}
          <div className={styles.modalContentWrapper}>
            <div style={{ fontSize: '20px' }}>{message}</div>
            {!isErrorMessage && <div className={styles.depositButton} onClick={goDeposit}>Nạp Tiền</div>}
            <CustomerSupportAnimatedItem />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default RegisterPopupModal