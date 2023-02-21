import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import profilePage from '../../assets/0.png'
import InnerHeader from '../../components/InnerHeader'
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    const userData = async () => {
      const userAPI = await axios.get('https://bo.ssv388.info/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      setUser(userAPI.data)
    }
    userData()
  }, [])

  return (
    <div className={styles.layout}>
      <InnerHeader title="Thông tin" />
      <div className={styles.section}>
        <div className={styles.profileSection}>
          <img src={profilePage} className={styles.profileImage} />
          <div className={styles.profileText}>
            <span>{user && user.phone}</span>
            <div>
              <span style={{ paddingRight: '3px' }}>₫</span>
              <span>{user && user.balance}</span>
            </div>
          </div>
        </div>
        <div>
          <button className={styles.button}>Nạp Tiền</button>
          <button className={styles.button}>Rút Tiền</button>
        </div>
        <Link to={'/transections'}>
          <button className={styles.button}>Transections</button>
        </Link>
      </div>
    </div>
  )
}

export default Profile