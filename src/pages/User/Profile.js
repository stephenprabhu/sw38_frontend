import React from 'react'
import profilePage from '../../assets/0.png'
import InnerHeader from '../../components/InnerHeader'
import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.layout}>
        <InnerHeader title="Thông tin"  />
        <div className={styles.section}>
            <div className={styles.profileSection}>
                <img src={profilePage} className={styles.profileImage} />
                <div className={styles.profileText}>
                    <span>username</span>
                    <div>
                        <span className={styles.currency}>₫</span>
                        <span className={styles.amount}>0.00</span>
                    </div>
                </div>
            </div>
            <button className={styles.button}>Nạp Tiền</button>
            <button className={styles.button}>Rút Tiền</button>
        </div>
    </div>
  )
}

export default Profile