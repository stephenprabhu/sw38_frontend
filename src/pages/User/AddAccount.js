import React, { useEffect, useState } from 'react'
import InnerHeader from '../../components/InnerHeader'
import vietnamBankArray from '../../data/vn-banks'
import styles from "./AddAccount.module.css"
import { CiCreditCard1 } from "react-icons/ci";
import { AddAccountAPI } from '../../helpers/APIs/AddAccountAPI';
import { EditAccount } from '../../helpers/APIs/EditAccount';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddAccount = () => {
  const [bankName, setBankName] = useState(vietnamBankArray[0]);
  const [accNumber, setAccNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [editBank, setEditBank] = useState()

  const navigate = useNavigate()
  const param = useParams();

  useEffect(() => {
    // if (param.id) {
    //   bankEditAPI(param.id)
    // }
    // const userBankNameAPI = async (id) => {
    //   const res = await axios.get('https://bo.ssv388.info/api/bank/user_bank/', {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    //     }
    //   });
    //   console.log(res)
    //   // setEditBank(res.data)
    //   // setUserName(res.data.User_name)
    //   // setAccNumber(res.data.account_number)
    //   // setBankName(vietnamBankArray.filter((accName) => accName === res.data.bank_name))
    // }
    // userBankNameAPI()

    // setUserName('mybankname')
    // userName ? '' : 

  }, [])

  // edit bank API
  const bankEditAPI = async (id) => {
    const res = await axios.get('https://bo.ssv388.info/api/bank/user_bank/' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    setEditBank(res.data)
    setUserName(res.data.User_name)
    setAccNumber(res.data.account_number)
    setBankName(vietnamBankArray.filter((accName) => accName === res.data.bank_name))
  }

  // submit func
  const addAccount = async (e) => {
    e.preventDefault()
    if (bankName && accNumber && userName) {
      if (editBank) {
        const x = await EditAccount(bankName, accNumber, userName, param.id);
        console.log('API response:', x)
        if (x.status) {
          navigate('/withdraw')
        }
      } else {
        // add new Bank
        const x = await AddAccountAPI(bankName, accNumber, userName);
        if (x) {
          navigate('/withdraw')
        } else {
          console.log('API error')
        }
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
        <button className={styles.cancel} onClick={() => navigate('/withdraw')}>Hủy</button >
      </div>
    </form>
  )
}

export default AddAccount