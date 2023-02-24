import React from 'react'
import styles from './CoolAnimatedButton.module.css'

const CoolAnimatedButton = ({text}) => {
  return (
   <div className={styles.wrap}>
         <button href={"/"} className={styles.animbutton}>{text}</button>
   </div>
  )
}

export default CoolAnimatedButton