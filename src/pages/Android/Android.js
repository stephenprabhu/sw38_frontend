import styles from './Android.module.css';
import step1 from '../../assets/Step1.png';
import step2 from '../../assets/Step2.jpg';
import step3 from '../../assets/Step3.png';
import step4 from '../../assets/Step4.png';
import step5 from '../../assets/Step5.png';
import step6 from '../../assets/Step6.png';
import step7 from '../../assets/Step7.png';
import { useState } from 'react';
import StepModal from './StepModal';
import { BsArrowDownCircle } from "react-icons/bs";
import Layout from '../../Layout/Layout';

const androidSteps = [{ label: 'Bước 1', image: step1 }, { label: 'Bước 2', image: step2 }, { label: 'Bước 3', image: step3 }, { label: 'Bước 4', image: step4 }
  , { label: 'Bước 5', image: step5 }, { label: 'Bước 6', image: step6 }, , { label: 'Bước 7', image: step7 }]

  // href='gasv388.apk' download='gasv388.apk'

const Android = () => {
  const [stepModal, setStepModal] = useState('')
  return (
    <Layout title="Android">
      <div className={styles.androidWrapper}>
        <div className={styles.downloadWrapper}>
          <div className={styles.downloadButton}>
            <a href='svw38.apk' download='svw38.apk'>T<span className={styles.glowingTxt}>ả</span>i x<span className={styles.faultyLetter}>uốn</span>g</a>
            <BsArrowDownCircle color='#0D2259' />
          </div>
        </div>
        {androidSteps.map((step) => (
          <div className={styles.ImageCard} key={step.label} onClick={() => setStepModal(step.label)}>
            <p>{step.label}</p>
            <img src={step.image} alt='stepLogo'/>
          </div>
        ))}
        <StepModal openStep={stepModal ? true : false} hideModal={() => setStepModal()} stepList={androidSteps} stepModal={stepModal} />
      </div>
    </Layout>
  )
}

export default Android