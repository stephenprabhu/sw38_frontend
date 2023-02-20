import React, { useState } from 'react'
import InnerHeader from '../../components/InnerHeader'
import vietnamBankArray from '../../data/vn-banks'
import styles from "./AddAccount.module.css"
import { CiCreditCard1 } from "react-icons/ci";
import { AddAccountAPI } from '../../helpers/APIs/AddAccountAPI';
import { useNavigate } from 'react-router-dom';

const AddAccount = () => {
  const [bankName, setBankName] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  // submit func
  const addAccount = async (e) => {
    e.preventDefault()
    if (bankName && accNumber && userName) {
      const x = await AddAccountAPI(bankName, accNumber, userName);
      if (x) {
        navigate('/withdraw')
      } else {
        console.log('API error')
      }
    }
  }

  return (
    <form onSubmit={addAccount}>
      <InnerHeader title="Thêm tài khoản ngân hàng" />
      <div className={styles.layout}>
        <div className={styles.inputItem}>
          <input className={styles.whiteInput} style={{ border: "none" }} placeholder="＊ Tên tài khoản" required value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <select className={styles.select} required value={bankName} onChange={(e) => setBankName(e.target.value)}>
          {vietnamBankArray.map((val, index) => <option key={index}>{val}</option>)}
        </select>
        <div className={styles.inputItem}>
          <CiCreditCard1 size={25} style={{ color: "gray" }} />
          <input className={styles.whiteInput} style={{ border: "none" }} placeholder="＊ Vui lòng nhập số tài khoản" required value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
        </div>
        <button className={styles.submit} type='submit'>Xác nhận</button>
      </div>
    </form>
  )
}

export default AddAccount