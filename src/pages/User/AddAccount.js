import React from 'react'
import InnerHeader from '../../components/InnerHeader'
import vietnamBankArray from '../../data/vn-banks'
import styles from "./AddAccount.module.css"
import {CiCreditCard1} from "react-icons/ci";

const AddAccount = () => {
  return (
    <div>
        <InnerHeader title="Thêm tài khoản ngân hàng"  />
        <div className={styles.layout}>
          <select className={styles.select}>
            {vietnamBankArray.map((val, index) => <option key={index}>{val}</option>)}
          </select>
          <div className={styles.inputItem}>
              <CiCreditCard1 size={25} style={{color:"gray"}} />
              <input className={styles.whiteInput} style={{border: "none"}} placeholder="＊ Vui lòng nhập số tài khoản" />
          </div>
          <button className={styles.submit}>Xác nhận</button>
        </div>
    </div>
  )
}

export default AddAccount