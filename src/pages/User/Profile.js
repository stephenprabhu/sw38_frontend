import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import profilePage from '../../assets/0.png'
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import InnerHeader from '../../components/InnerHeader'
import { APIUser } from '../../helpers/APIs/UserAPIs';
import styles from './Profile.module.css';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineContentCopy } from 'react-icons/md';

const Profile = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const userData = async () => {
      const userAPI = await APIUser()
      setUser(userAPI)
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
          <div className={styles.userInfoSection}>
            <CopyItemComponent item={{ label: "Số điện thoại đăng nhập", value: 'hello' }} />
            <CopyItemComponent item={{ label: "Mật khẩu mặc định", value: 'pass' }} showHideOption={true} />
            <div style={{ color: "white", fontSize: "12px", maxWidth: "80%", margin: "auto", paddingTop: '5px', textAlign: 'center' }}>
              <i>* Nếu bạn đã thay đổi</i>  &nbsp; mật khẩu vui lòng liên hệ chăm sóc khách hàng. <br />
              Bấm vào đây để được <CustomerSupportAnimatedItem />
            </div>
          </div>
        </div>
        <Link to={'/transections'}>
          <button className={styles.button}>giao dịch</button>
        </Link>
      </div>
    </div>
  )
}

export default Profile

const CopyItemComponent = ({ item, showHideOption = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onCopyClicked = () => {
    navigator.clipboard.writeText(item.value);
  }
  return (
    <div className={styles.bankDetailItem}>
      <div style={{ textAlign: "left" }}>
        <span className={styles.grayLabel}>{item.label}</span><br />
        {!showHideOption ? <span className={styles.grayValue}>{item.value}</span> : ""}
        {showHideOption ? <span className={styles.grayValue}>{showPassword ? item.value : item.value.replace(/./g, "*")}</span> : ""}
        {showHideOption ? <span style={{ paddingLeft: "10px" }}>{showPassword ? <FiEye onClick={() => setShowPassword(false)} color='#F7DB89' /> : <FiEyeOff onClick={() => setShowPassword(true)} color='#F7DB89' />}</span> : ""}
      </div>
      <span className={styles.copyButton} onClick={onCopyClicked}>
        Copy <MdOutlineContentCopy style={{ marginLeft: "7px" }} />
      </span>
    </div>
  )
}