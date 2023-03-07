import React from 'react';
import styles from './CoolAnimatedButton.module.css';
import { FaRegHandPointUp } from "react-icons/fa";

const CoolAnimatedButton = ({ text, link }) => {
  return (
    <div className={styles.buttonOverlay}>
      <div className={styles.ButtonWrapper} onClick={() => window.open(link)}>
        <div>
          <p></p>
          <FaRegHandPointUp size={15} className={styles.pointerIcon} />
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default CoolAnimatedButton