import React from 'react'
import styles from './Promotions.module.css'
import BottomMenu from '../../components/BottomMenu'
import Header from '../../components/Header'

const Promotions = () => {
  return (
    <div className={styles.promotionWrapper}>
      <Header />
      <div className={styles.promotionContent}>
        {/*Header Section*/}
        <div className={styles.promotionHeader}>
          <h2>Agency</h2>
          <div className={styles.headerButtons}>
            <button>Signin</button>
            <button>Login</button>
          </div>
          <p>Some text</p>
        </div>
      </div>
      <BottomMenu />
    </div>
  )
}

export default Promotions
