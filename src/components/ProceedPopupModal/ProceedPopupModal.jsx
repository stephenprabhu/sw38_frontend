import { Modal } from '@mui/material'
import styles from './ProceedPopupModal.module.css'

const ProceedPopupModal = ({proceedState, setProceedState}) => {
  const hideModal = () => {
    setProceedState(null)
  }
  return (
    <Modal open={proceedState} onClose={hideModal} className={styles.allGamesOverlay}>  
      <div className={styles.allGamesWrapper}>
        <p>hallo</p>
      </div>
    </Modal>
  )
}

export default ProceedPopupModal