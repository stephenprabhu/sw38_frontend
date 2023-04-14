import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import InnerHeader from '../../components/InnerHeader'
import { APIUser } from '../../helpers/APIs/UserAPIs';
import styles from './Profile.module.css';
import { MdOutlineContentCopy } from 'react-icons/md';
import { APILatestTransaction } from '../../helpers/APIs/TransactionAPI';
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CircularProgress } from '@mui/material';

let interval = null;
const Profile = () => {
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const [rejectRequest, setRejectRequest] = useState('')

  // useEffect(() => {
  //   const userData = async () => {
  //     const userAPI = await APIUser()
  //     setUser(userAPI)
  //   }
  //   userData()
  //   const bankList = async () => {
  //     const allBanks = await bankListAPI()
  //     setBanks(allBanks.reverse().slice(0, 2))
  //   }
  //   bankList()
  // }, [])

  useEffect(() => {
    userData()
  }, [])

  // User Data
  const userData = async () => {
    const userAPI = await APIUser()
    if (userAPI.response && userAPI.response.data.message === "Unauthenticated.") {
      localStorage.removeItem('auth_token')
      navigate('/login')
    } else {
      setUser(userAPI)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('initialDeposit')) {
      interval = setInterval(() => {
        userTransaction()
      }, 20000);
      return () => clearInterval(interval);
    }
  }, []);

  // again call for transaction status
  const userTransaction = async () => {
    const res = await APILatestTransaction(localStorage.getItem('auth_token'));
    if (res) {
      if (res.is_approved === 2) {
        if (interval) {
          setRejectRequest('Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!')
          clearInterval(interval);
          localStorage.removeItem('initialDeposit')
        }
      } else if (res.is_approved === 1) {
        if (interval) {
          clearInterval(interval);
          localStorage.removeItem('initialDeposit')
          userData()
        }
      }
    }
  }

  // get deposit time from localStorage
  const getDepositTime = localStorage.getItem('initialDeposit')
  const depositTime = new Date() - new Date(getDepositTime)

  return (
    <div className={styles.layout}>
      <InnerHeader title="Thông tin" />
      <div className={styles.profileOverlay}>
        <div className={styles.profileContentOverlay}>
          <div className={styles.profileCardWrapper}>
            <div className={styles.profileCard}>  
              <div>
                <BsFillPersonFill size={80} color='#F7DB89' />
              </div>
              {user && 
                <div className={styles.depositButtons}>
                  <CopyItemComponent item={{ label: "Số điện thoại đăng nhập", value: user.phone }} />
                  {user.user_id && <CopyItemComponent item={{ label: "Tài khoản SV388", value: user.user_id && !user.user_name ? user.user_id : user.user_name }} />}
                  {user.user_id && <CopyItemComponent item={{ label: "Mật khẩu mặc định", value: user.raw_string }} />}
                  {!user.user_id && !getDepositTime && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', textAlign:'center' }}>Để lấy tên tài khoản và mật khẩu. Vui lòng<br />Nạp Tiền kích hoạt tài khoản !</span>}
                  {!user.user_id && !getDepositTime && !rejectRequest && <Link to='/deposit' className={styles.depositButton} onClick={''}>Nạp Tiền</Link>}
                  {/*!userInfo.user_id && isInitalDeposit && <span className={styles.depositWaitMsg}>Vui lòng chờ cấp tài khoản trong giây lát...</span>*/}
                  {rejectRequest && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', paddingBottom: '7px' }}>{rejectRequest}</span>}
                  {!user.user_id && getDepositTime && depositTime > 600000 && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', textAlign:'center' }}>Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!</span>}
                  {!user.user_id && getDepositTime && depositTime < 600000 && <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', color:'#F7DB89' }}><div><CircularProgress size={50} style={{color:"#DEB849"}}/></div><div style={{textAlign:'center'}}>Vui lòng chờ cấp tài khoản trong giây lát…</div></div>}
                </div>
              }
            </div>          
            <div style={{ marginTop: '10px', width:'50%', margin:'auto' }}>{user && !user.user_id && depositTime > 600000 && <CustomerSupportAnimatedItem />}</div>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <button onClick={() => window.open('https://www.sfv388.com/')} className={styles.linkBtn}>ĐẶT CƯỢC NGAY</button>
          </div>
        </div>
        <div className={styles.depositButtonsGroup}>
          <Link to="/deposit" className={styles.button}>Nạp Tiền</Link>
          <Link to="/withdraw" className={styles.button}>Rút Tiền</Link>
          <Link to={'/transections'} className={styles.button}>Giao Dịch</Link>
        </div>
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
        <span className={`${styles.grayLabel} ${item.label === 'Số điện thoại đăng nhập' && styles.userNameLabel}`}>{item.label}</span><br />
        {!showHideOption ? <span className={`${styles.grayValue} ${item.label === 'Số điện thoại đăng nhập' && styles.userName}`}>{item.value}</span> : ""}
        {showHideOption ? <span className={styles.grayValue}>{showPassword ? item.value : item.value.replace(/./g, "*")}</span> : ""}
        {showHideOption ? <span>{showPassword ? <AiFillEye onClick={() => setShowPassword(false)} size={18} style={{ paddingLeft: "7px", position: 'relative', bottom: '-3px' }} /> : <AiFillEyeInvisible onClick={() => setShowPassword(true)} size={18} style={{ paddingLeft: "7px" }} />}</span> : ""}
      </div>
      {item.label === 'Số điện thoại đăng nhập' ? '' : <span className={styles.copyButton} onClick={onCopyClicked}>
        <span>Copy</span>
        <MdOutlineContentCopy size={18} />
      </span>}
    </div>
  )
}