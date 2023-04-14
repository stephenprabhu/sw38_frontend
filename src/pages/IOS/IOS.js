import { useState } from 'react';
import styles from './IOS.module.css';
import InnerHeader from '../../components/InnerHeader';
import StepModal from '../Android/StepModal';
import step1 from '../../assets/IOS1.jpg';
import step2 from '../../assets/IOS2.jpg';
import step3 from '../../assets/IOS3.jpg';

const iosSteps = [{ label: 'Bước 1', image: step1 }, { label: 'Bước 2', image: step2 }, { label: 'Bước 3', image: step3 }]

const IOS = () => {
  const [stepModal, setStepModal] = useState('')
  return (
    <div className={styles.iosOverlay}>
      <InnerHeader title={"IOS"} />
      <div className={styles.iosWrapper}>
        {iosSteps.map((step) => (
          <div className={styles.ImageCard} key={step.label} onClick={() => setStepModal(step.label)}>
            <p>{step.label}</p>
            <img src={step.image} alt='stepImg'/>
          </div>
        ))}
        <StepModal openStep={stepModal ? true : false} hideModal={() => setStepModal()} stepList={iosSteps} stepModal={stepModal} />
      </div>
    </div>
  )
}

export default IOS