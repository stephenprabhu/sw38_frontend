import React, { useContext, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { BsPlus } from 'react-icons/bs'
import { Link, useNavigate, } from 'react-router-dom'
import InnerHeader from '../../components/InnerHeader'
import { bankListAPI, WithdrawAPI } from '../../helpers/APIs/WithdrawAPI'
import UserContext from '../../helpers/Context/user-context'
import styles from './Withdraw.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import { addCommasToInput } from '../../helpers/NumberHelper'
import PopupErrorModal from '../../components/PopupErrorModal'

const Withdraw = () => {
  const [banks, setBanks] = useState()
  const [bankId, setBankId] = useState()
  const [transactionAmount, setTransactionAmount] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState(null)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ctx = useContext(UserContext);

  // user bank list
  useEffect(() => {
    // bank list API
    const bankList = async () => {
      const allBanks = await bankListAPI()
      setBanks(allBanks)
      setBankId(allBanks[0] ? allBanks[0].id : null);
      setBankAccountNumber(allBanks[0] ? allBanks[0].account_number : null);
    }
    bankList()
  }, [])

  const navigate = useNavigate()
  // submitwithdraw
  const submitwithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const intTransactionAmount = transactionAmount.replace(/,/g, '');
    if (transactionAmount > 100000000) {
      setError('Vui lòng chọn dưới 100,000,000')
    } else if (transactionAmount < 150000) {
      setError('Vui lòng chọn trên 150,000')
    } else if (!bankId) {
      setError('Vui lòng thêm ngân hàng')
    } else if (bankId && transactionAmount) {
      const x = await WithdrawAPI(bankId, transactionAmount, bankAccountNumber);
      if (x === "Account Not Activated") {
        setError('Tài khoản của bạn chưa được kích hoạt')
      } else if( x === "WAIT_PLEASE"){
        setErrorModal(true)
        setErrorMessage("Bạn có yêu cầu đang chờ xử lý. Bạn không thể tạo yêu cầu mới khi đang có yêu cầu chờ xử lý. Vui lòng yêu cầu lại sau.");
      } else if ( x === "MAKE_DEPOSIT_REQUEST_FIRST") {
        setErrorModal(true)
        setErrorMessage("Make Deposit Request First");
      } else {
        if (x.status) {
          navigate('/transections?tab=withdraw')
        } else if (x.message === 'not enough money') {
          setError('Số dư không đủ')
        }
      }
    }
    setLoading(false);
  }

  // const onWithdrawAmountChange = val => {
  //   setTransactionAmount(addCommasToInput(val));
  // }

  return (
    <form className={styles.layout} onSubmit={submitwithdraw}>
      <InnerHeader title="Rút Tiền" />
      {ctx.user ? ctx.user.name : ""}
      <h4 style={{ color: '#F7DB89', textAlign: 'center' }} >Thẻ ngân hàng của tôi</h4>
      <div className={styles.withdrawWrapper}>
        <div className={styles.section}>
          {banks && banks.length ? (
            <div className={styles.banksSection}>
              {banks && banks.map((bank) => {
                return (
                  <div style={{ display: 'flex', gap: 10 }} key={bank.id} onClick={() => setBankId(bank.id)}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '5px', flexGrow: 1 }}>
                      <input type="radio" value={bank.id} checked={bankId === bank.id} name={bankId} onChange={() => setBankId(bank.id)} />
                      <div className={styles.bankCard} >
                        <span>{bank.User_name}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                          <span>{bank.bank_name}</span>
                          <span style={{ paddingLeft: '10px' }}>{bank.account_number}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>) : ''
          }

          <div className={styles.divider}>
            <Link to='/add-account'>
              <BsPlus size={25} className={styles.addButton} />
            </Link>
          </div>

          <div className={styles.formSecton}>
            {/* <div className={styles.balanceSection}>
            <p> Ví chính: ₫ {userBalance}</p>
          </div> */}
            <div className={styles.inputItem}>
              <pre>Số tiền</pre>
              <input
                className={styles.whiteInput}
                style={{ border: "none" }}
                placeholder="100K - 100M"
                value={transactionAmount}
                onChange={(e) => { setTransactionAmount(e.target.value); setError('') }}
                required />
            </div>
            {error && <Typography mt={2} color='red'>{error}</Typography>}
            {loading ? <div style={{display:'flex', justifyContent:'center'}}><CircularProgress style={{ marginTop: "20px", color:"#DEB849" }} /></div> : ""}
          </div>
        </div>
        <button className={styles.submit} disabled={loading} type='submit'>{loading ? "Đang tải..." : "Xác nhận"}</button>
        <PopupErrorModal message={errorMessage} show={errorModal} hideModal={() => setErrorModal(false)}/>
      </div >
    </form >
  )
}

export default Withdraw