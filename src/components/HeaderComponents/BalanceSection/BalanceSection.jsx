import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../helpers/Context/user-context';
import styles from './BalanceSection.module.css';
import CommaSeperator from '../../CommaSeperator';
import AllGameStatusModal from '../AllGameStatusModal/AllGameStatusModal';
import { useNavigate } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import { FaDatabase } from "react-icons/fa";
// import { APIUserInfo } from '../../../helpers/APIs/UserAPIs';

const BalanceSection = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [loader, setLoader] = useState(null)
  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('auth_token')) {
      userInfoApi()
    }
  },[])

  // User Information API
  const userInfoApi = async () => {
    // const userInfoApiRes = await APIUserInfo()
    // if(userInfoApiRes.response && userInfoApiRes.response.data && userInfoApiRes.response.data.message == 'Unauthenticated.') {
    //   onLogOutClicked()
    // } else {
    //   ctx.setUserBalance(userInfoApiRes.balance)
    //   ctx.setUserInfo(userInfoApiRes)
    // }
  }

  // logout
  const onLogOutClicked = () => {
    navigate('/login')
    ctx.setUser(null);
    ctx.setUserBalance()
    ctx.setUserInfo()
    localStorage.removeItem("auth_token");
  }

  return (
    <div className={styles.userInfoSection}>
      <div className={styles.balanceSection} onClick={() => setShowBalance(true)}>
        <div className={styles.userName}>Tom</div>
        <FaDatabase className={styles.userIcons}/>
        <span>{`${CommaSeperator(52124)} K`}</span>
      </div>
      <RxExit onClick={onLogOutClicked} className={styles.userIcons}/>
      {showBalance && <AllGameStatusModal showBalance={showBalance} onClose={() => {setShowBalance(false); setLoader(null)}} loader={loader} setLoader={setLoader}/>}
    </div>
  )
}

export default BalanceSection