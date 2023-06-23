// import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css';
import Layout from '../../Layout/Layout';
import InfoIcon from '../../assets/ProfilePageIcons/InfoIcon.png';
import Telegram from '../../assets/ProfilePageIcons/Telegram.png';
import UserInterface from '../../assets/ProfilePageIcons/UserInterface.png';
import Whatsapp from '../../assets/ProfilePageIcons/Whatsapp.png';
import GoogleAuthentication from '../../assets/ProfilePageIcons/GoogleAuthentication.png';
import MaskGroup from '../../assets/ProfilePageIcons/MaskGroup.png';
import Coin from '../../assets/ProfilePageIcons/Coin.png';
import Electic from '../../assets/ProfilePageIcons/Electtic.png';
import ProceedPopupModal from '../../components/ProceedPopupModal/ProceedPopupModal';
import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { APIUser } from '../../helpers/APIs/UserAPIs';
// import { APILatestTransaction } from '../../helpers/APIs/TransactionAPI';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { BsFillPersonFill } from "react-icons/bs";
// import InnerHeader from '../../components/InnerHeader'
// import { CircularProgress } from '@mui/material';
// import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';

// let interval = null;
const rewardArray = [{media: Telegram, text: 'Set Telegram, you can receive 2.00'}, {media: UserInterface, text: 'Download, install, and log in to the app for the first time, you can collect it 2.00'}
  , {media: Whatsapp, text: 'Set Whatsapp, you can receive 2.00'}, {media: GoogleAuthentication, text: 'Set up Google Authenticator to claim 5.00'}
  , {media: MaskGroup, text: 'Bind Email to take 5.00'} ]

const Profile = () => {
  const [proceedState, setProceedState] = useState()
  // const [user, setUser] = useState()
  // const navigate = useNavigate()
  // const [rejectRequest, setRejectRequest] = useState('')

  // useEffect(() => {
  //   userData()
  // }, [])

  // User Data
  // const userData = async () => {
  //   const userAPI = await APIUser()
  //   if (userAPI.response && userAPI.response.data.message === "Unauthenticated.") {
  //     localStorage.removeItem('auth_token')
  //     navigate('/login')
  //   } else {
  //     setUser(userAPI)
  //   }
  // }

  // Check initial deposit
  // useEffect(() => {
  //   if (localStorage.getItem('initialDeposit')) {
  //     interval = setInterval(() => {
  //       userTransaction()
  //     }, 20000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

  // again call for transaction status
  // const userTransaction = async () => {
  //   const res = await APILatestTransaction(localStorage.getItem('auth_token'));
  //   if (res) {
  //     if (res.is_approved === 2) {
  //       if (interval) {
  //         setRejectRequest('Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!')
  //         clearInterval(interval);
  //         localStorage.removeItem('initialDeposit')
  //       }
  //     } else if (res.is_approved === 1) {
  //       if (interval) {
  //         clearInterval(interval);
  //         localStorage.removeItem('initialDeposit')
  //         userData()
  //       }
  //     }
  //   }
  // }

  // get deposit time from localStorage
  // const getDepositTime = localStorage.getItem('initialDeposit')
  // const depositTime = new Date() - new Date(getDepositTime)

  return (
    <Layout title="Thông tin" active='Tài Khoản'>
      <div className={styles.profileOverlay}>
        
        <div className={styles.profileHeader}>
          <div>
            <img src={InfoIcon} alt='InfoIcon'/>
          </div>
          <span>Free rewardring any deposit can be paid, the upper limit of the payment 300.00</span>
        </div>

        <div className={styles.profileBody}>
          
          {rewardArray.map((reward, index) => (
            <div className={styles.rewardCardWrapper} key={index}>
              <div className={styles.mediaImgWrapper}>
                <img src={reward.media} alt='mediaIcon'/>
              </div>
              <div className={styles.rewardCardInner}>
                <p>{reward.text}</p>
                <p className={styles.rewardBar}>0/1</p>
                <div className={styles.rewardCoinsWrapper}>
                  <div className={styles.rewardCoin}>
                    <img src={Coin} alt='CoinImg'/>
                    <span>2</span>
                  </div>
                  <div className={styles.rewardCoin}>
                    <img src={Electic} alt='ElecticImg'/>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setProceedState(1)}>Proceed</button>
              {proceedState && <ProceedPopupModal proceedState={proceedState} setProceedState={setProceedState}/>}
            </div>
          ))}
        </div>

      </div>
    </Layout>
  )
}

export default Profile

// <div className={styles.profileContentOverlay}>
//           <div className={styles.profileCardWrapper}>
//             <div className={styles.profileCard}>  
              
//               <BsFillPersonFill size={80} color='white' />
              
//               {user && 
//                 <div className={styles.depositButtons}>
//                   <CopyItemComponent item={{ label: "Số điện thoại đăng nhập", value: user.phone }} />
//                   {user.user_id && <CopyItemComponent item={{ label: "Tài khoản SV388", value: user.user_id && !user.user_name ? user.user_id : user.user_name }} />}
//                   {user.user_id && <CopyItemComponent item={{ label: "Mật khẩu mặc định", value: user.raw_string }} />}
//                   {!user.user_id && !getDepositTime && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', textAlign:'center' }}>Để lấy tên tài khoản và mật khẩu. Vui lòng<br />Nạp Tiền kích hoạt tài khoản !</span>}
//                   {!user.user_id && !getDepositTime && !rejectRequest && <Link to='/deposit' className={styles.depositButton} onClick={''}>Nạp Tiền</Link>}
//                   {/*!userInfo.user_id && isInitalDeposit && <span className={styles.depositWaitMsg}>Vui lòng chờ cấp tài khoản trong giây lát...</span>*/}
//                   {rejectRequest && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', paddingBottom: '7px' }}>{rejectRequest}</span>}
//                   {!user.user_id && getDepositTime && depositTime > 600000 && <span style={{ color: 'red', fontWeight: 'bold', fontSize: '15px', textAlign:'center' }}>Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!</span>}
//                   {!user.user_id && getDepositTime && depositTime < 600000 && <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', color:'#F7DB89' }}><div><CircularProgress size={50} style={{color:"#DEB849"}}/></div><div style={{textAlign:'center'}}>Vui lòng chờ cấp tài khoản trong giây lát…</div></div>}
//                 </div>
//               }
//             </div>          
//             <div style={{ marginTop: '10px', width:'50%', margin:'auto' }}>{user && !user.user_id && depositTime > 600000 && <CustomerSupportAnimatedItem />}</div>
//           </div>
//           <div style={{display:'flex', justifyContent:'center'}}>
//             <button onClick={() => window.open('https://www.sfv388.com/')} className={styles.linkBtn}>ĐẶT CƯỢC NGAY</button>
//           </div>
//         </div>
//         <div className={styles.depositButtonsGroup}>
//           <Link to="/deposit" className={styles.button}>Nạp Tiền</Link>
//           <Link to="/withdraw" className={styles.button}>Rút Tiền</Link>
//           <Link to={'/transections'} className={styles.button}>Giao Dịch</Link>
//         </div>

// const CopyItemComponent = ({ item, showHideOption = false }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const onCopyClicked = () => {
//     navigator.clipboard.writeText(item.value);
//   }
//   return (
//     <div className={styles.bankDetailItem}>
//       <div style={{ textAlign: "left" }}>
//         <span className={`${styles.grayLabel} ${item.label === 'Số điện thoại đăng nhập' && styles.userNameLabel}`}>{item.label}</span><br />
//         {!showHideOption ? <span className={`${styles.grayValue} ${item.label === 'Số điện thoại đăng nhập' && styles.userName}`}>{item.value}</span> : ""}
//         {showHideOption ? <span className={styles.grayValue}>{showPassword ? item.value : item.value.replace(/./g, "*")}</span> : ""}
//         {showHideOption ? <span>{showPassword ? <AiFillEye onClick={() => setShowPassword(false)} size={18} style={{ paddingLeft: "7px", position: 'relative', bottom: '-3px' }} /> : <AiFillEyeInvisible onClick={() => setShowPassword(true)} size={18} style={{ paddingLeft: "7px" }} />}</span> : ""}
//       </div>
//       {item.label === 'Số điện thoại đăng nhập' ? '' : <span className={styles.copyButton} onClick={onCopyClicked}>
//         <MdOutlineContentCopy size={18} />
//         <span>Copy</span>
//       </span>}
//     </div>
//   )
// }