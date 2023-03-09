import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import profilePage from '../../assets/0.png'
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import InnerHeader from '../../components/InnerHeader'
import { APIUser } from '../../helpers/APIs/UserAPIs';
import styles from './Profile.module.css';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineContentCopy } from 'react-icons/md';
import { bankListAPI } from '../../helpers/APIs/WithdrawAPI';

const Profile = () => {
  const [user, setUser] = useState()
  const [banks, setBanks] = useState()

  useEffect(() => {
    const userData = async () => {
      const userAPI = await APIUser()
      setUser(userAPI)
    }
    userData()
    const bankList = async () => {
      const allBanks = await bankListAPI()
      setBanks(allBanks.reverse().slice(0, 2))
    }
    bankList()
  }, [])

  console.log(banks)

  return (
    <div className={styles.profileOverlay}>
      <InnerHeader title="Thông tin" />
      <div className={styles.profileWrapper}>
        <div className={styles.profileSection}>
          <img src={profilePage} className={styles.profileImage} />
          <div className={styles.userInfoSection}>
            {user && <CopyItemComponent item={{ label: "Số điện thoại đăng nhập", value: user.phone }} />}
            {user && <CopyItemComponent item={{ label: "Mật khẩu mặc định", value: user.user_id }} />}
            <div style={{ color: "white", fontSize: "12px", maxWidth: "80%", margin: "auto", paddingTop: '5px', textAlign: 'center' }}>
              <i>* Nếu bạn quên</i>  &nbsp; mật khẩu vui lòng liên hệ chăm sóc khách hàng. <br />
              Bấm vào đây để được <CustomerSupportAnimatedItem />
            </div>
          </div>
          <Link to={'/transections'} style={{ marginTop: '20px' }}>
            <button className={styles.button}>giao dịch</button>
          </Link>
          <div className={styles.bankListOverlay}>
            {banks && banks.length ? banks.map((bank) => {
              return (
                <div className={styles.bankCard} >
                  <span>{bank.User_name}</span>
                  <div className={styles.bankWrapper}>
                    <span>{bank.bank_name}</span>
                    <span style={{ paddingLeft: '10px' }}>{bank.account_number}</span>
                  </div>
                </div>
              )
            }) : ''}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile

const CopyItemComponent = ({ item }) => {

  const onCopyClicked = () => {
    navigator.clipboard.writeText(item.value);
  }
  return (
    <div className={styles.bankDetailItem}>
      <div style={{ textAlign: "left" }}>
        <span className={styles.grayLabel}>{item.label}</span><br />
        <span className={styles.grayValue}>{item.value}</span>
      </div>
      {item.label !== 'Số điện thoại đăng nhập' &&
        <span className={styles.copyButton} onClick={onCopyClicked}>
          Copy <MdOutlineContentCopy style={{ marginLeft: "7px" }} />
        </span>}
    </div>
  )
}