import React, { useContext, useEffect, useState } from 'react'
import { Box, Modal, Typography } from '@mui/material'
import { FaInfoCircle } from 'react-icons/fa';
import axios from 'axios'
import { BsPlus } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import InnerHeader from '../../components/InnerHeader'
import { WithdrawAPI } from '../../helpers/APIs/WithdrawAPI'
import UserContext from '../../helpers/Context/user-context'
import styles from './Withdraw.module.css'

const Withdraw = () => {
  const [banks, setBanks] = useState()
  const [userBalance, setUserBalance] = useState()
  const [bankId, setBankId] = useState()
  const [transactionAmount, setTransactionAmount] = useState('')
  const [insuficentBlnc, setInsuficentBlnc] = useState('')

  const ctx = useContext(UserContext);
  const token = localStorage.getItem('auth_token')

  // bank list , user balance 
  useEffect(() => {
    // bank list API
    const bankListAPI = async () => {
      const res = await axios.get("https://bo.ssv388.info/api/bank/user_all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBanks(res.data)
      // default cheched
      setBankId(res.data[0].id && res.data[0].id)
    }

    // user balance API
    const userBalance = async () => {
      const res = await axios.get("https://bo.ssv388.info/api/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserBalance(res.data.balance)
    }
    bankListAPI()
    userBalance()
  }, [])

  // setTransactionAmountFunc
  const setTransactionAmountFunc = (e) => {
    setTransactionAmount(e.target.value)
    setInsuficentBlnc('')
  }
  // submitwithdraw
  const submitwithdraw = async (e) => {
    e.preventDefault()
    if (userBalance > 100000) {
      setInsuficentBlnc('')
    } if (userBalance < 100) {
      setInsuficentBlnc('Insuficent balance.,....!!')
    } else {
      setInsuficentBlnc('')
      if (bankId && transactionAmount) {
        const x = await WithdrawAPI(bankId, transactionAmount);
        console.log('Api Response: ', x)
        // if (!x) {
        //   console.log('error')
        //   // setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
        // } else {
        //   console.log(x);
        // }
      } else {
        console.log('Api Fail')
      }
    }

  }

  return (
    <form className={styles.layout} onSubmit={submitwithdraw}>
      <InnerHeader title="Rút Tiền" />
      {ctx.user.name}
      <div>
        <h4>Thẻ ngân hàng của tôi</h4>
      </div>
      <div className={styles.section}>

        {banks && banks.length &&
          <div className={styles.banksSection}>
            {banks && banks.map((bank) => {
              return (
                <label key={bank.id} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                  <input
                    type="radio"
                    value={bank.id}
                    checked={bankId === bank.id}
                    onChange={() => setBankId(bank.id)}
                    name={bankId}
                  />
                  <div className={styles.bankCard} >
                    <span>{bank.User_name}</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                      <span>{bank.bank_name}</span>
                      <span>{bank.account_number}</span>
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
        }

        <div className={styles.divider}>
          <div className={styles.addButton}>
            <Link to='/add-account'>
              <BsPlus size={25} />
            </Link>
          </div>
        </div>

        <div className={styles.formSecton}>
          <div className={styles.balanceSection}>
            <p> Ví chính: ₫ {userBalance}</p>
          </div>
          <div className={styles.inputItem}>
            <span>Số tiền</span>
            <input className={styles.whiteInput} style={{ border: "none" }} placeholder="100 - 100,000" value={transactionAmount} onChange={(e) => setTransactionAmountFunc(e)} required />
          </div>
          <Typography mt={2} color='red'>{insuficentBlnc}</Typography>
          <button className={styles.submit} type='submit'>Xác nhận</button>
        </div>
      </div>
    </form>
  )
}

export default Withdraw