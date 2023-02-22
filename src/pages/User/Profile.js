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
          </div>
        </div>
        <div>
          <Link to="/deposit" className={styles.button}>Nạp Tiền</Link>
          <Link to="/withdraw" className={styles.button}>Rút Tiền</Link>
        </div>
        <Link to={'/transections'}>
          <button className={styles.button}>giao dịch</button>
        </Link>
      </div>
    </div>
  )
}

export default Profile