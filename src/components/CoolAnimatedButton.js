import React from 'react'
import styles from './CoolAnimatedButton.module.css'

const CoolAnimatedButton = ({text, link}) => {
  return (
   <div className={styles.wrap}>
         <button onClick={()=> window.open(link)} className={styles.animbutton}>{text}</button>
   </div>
  )
}

export default CoolAnimatedButton