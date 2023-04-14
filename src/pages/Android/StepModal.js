import { Modal } from '@mui/material';
import styles from './StepModal.module.css';
import { AiOutlineClose } from "react-icons/ai";

const StepModal = ({ openStep, hideModal, stepList, stepModal }) => {
  const step = stepList && stepList.filter((step) => step.label === stepModal)

  return (
    <Modal open={openStep} onClose={hideModal}>
      <div className={styles.modalOverlay} onClick={hideModal}>
        <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
          {step &&
            <div className={styles.ImageCard}>
              <div className={styles.ImageCardHeader}>
                <p>{step[0] && step[0].label}</p>
                <AiOutlineClose className={styles.icon} onClick={hideModal} />
              </div>
              <img src={step[0] && step[0].image} alt='stepImg'/>
            </div>
          }
        </div>
      </div>
    </Modal>
  )
}

export default StepModal
