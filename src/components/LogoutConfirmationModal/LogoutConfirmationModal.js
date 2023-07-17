import { Modal } from '@mui/material';
import styles from './LogoutConfirmationModal.module.css';
import LogoutImg from './../../assets/Logout.png'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../helpers/Context/user-context';

const LogoutConfirmationModal = ({logoutModal, closeLogoutModal}) => {
  const navigate = useNavigate()
  const ctx = useContext(UserContext);

  // logout
  const onLogOutClicked = () => {
    navigate('/login')
    ctx.setUser(null);
    ctx.setUserBalance()
    ctx.setUserInfo()
    localStorage.removeItem("auth_token");
  }

  return (
    <Modal open={logoutModal}>
      <div className={styles.modalOverlay} onClick={closeLogoutModal}>
        <div className={styles.logoutOverlay} onClick={(e) => e.stopPropagation()}>
          <div className={styles.logoutImgwrapper}>
            <div><img src={LogoutImg} alt='logout' width={45}/></div>
            <p>Logout</p>
          </div>
          <div className={styles.logoutMsg}>
            Are you sure that you want <br/> to logout?
          </div>
          <div className={styles.logoutButtons}>
            <button onClick={closeLogoutModal}>No, Stay</button>
            <button onClick={onLogOutClicked}>Yes, leave</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LogoutConfirmationModal