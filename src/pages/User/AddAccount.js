import React, { useEffect, useState } from 'react'
import InnerHeader from '../../components/InnerHeader'
import vietnamBankArray from '../../data/vn-banks'
import styles from "./AddAccount.module.css"
import { CiCreditCard1 } from "react-icons/ci";
import { AddAccountAPI } from '../../helpers/APIs/AddAccountAPI';
// import { EditAccount } from '../../helpers/APIs/EditAccount';
import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
import { bankListAPI } from '../../helpers/APIs/WithdrawAPI';

const AddAccount = () => {
  const [bankName, setBankName] = useState(vietnamBankArray[0]);
  const [accNumber, setAccNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [bankExist, setBankExist] = useState(false)
  // const [editBank, setEditBank] = useState()

  const navigate = useNavigate()
  const param = useParams();

  useEffect(() => {
    // if (param.id) {
    //   bankEditAPI(param.id)
    // }
    const bankList = async () => {
      const allBanks = await bankListAPI()
      if (allBanks && allBanks.length) {
        setUserName(allBanks[0].User_name)
        setBankExist(true)
      }
    }
    bankList()
  }, [])

  // edit bank API
  // const bankEditAPI = async (id) => {
  //   const res = await axios.get('https://bo.ssv388.info/api/bank/user_bank/' + id, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('auth_token')}`
  //     }
  //   });
  //   setEditBank(res.data)
  //   setUserName(res.data.User_name)
  //   setAccNumber(res.data.account_number)
  //   setBankName(vietnamBankArray.filter((accName) => accName === res.data.bank_name))
  // }

  // submit func
  const addAccount = async (e) => {
    e.preventDefault()
    if (bankName && accNumber && userName && checkIfOnlyCapital(userName)) {
      // if (editBank) {
      //   const x = await EditAccount(bankName, accNumber, userName, param.id);
      //   console.log('API response:', x)
      //   if (x.status) {
      //     navigate('/withdraw')
      //   }
      // } else {
      // add new Bank
      const x = await AddAccountAPI(bankName, accNumber, userName);
      if (x) {
        navigate('/withdraw')
      } else {
        console.log('API error')
      }
    }
  }

  const checkIfOnlyCapital = (value) => {
    return /^[A-Z]*$/.test(value.replace(/\s+/g, ''));
  }

  return (
    <form onSubmit={addAccount} className={styles.formOverlay}>
      <InnerHeader title="Th??m t??i kho???n ng??n h??ng" />
      <div className={styles.formWrapper}>
        <div className={styles.layout}>
          <span className={`${styles.helptext} ${checkIfOnlyCapital(userName) ? "" : styles.danger}`}>T??n t??i kho???n vi???t IN HOA, kh??ng d???u, kh??ng c?? s???.</span>
          <div className={styles.inputItem} style={{ marginTop: "5px" }}>
            <input
              className={styles.whiteInput}
              style={{ border: "none" }}
              readOnly={bankExist}
              placeholder="??? T??n t??i kho???n"
              required
              value={userName}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
          </div>
          <select className={styles.select} required value={bankName} onChange={(e) => setBankName(e.target.value)}>
            {vietnamBankArray.map((val, index) => <option key={index}>{val}</option>)}
          </select>
          <div className={styles.inputItem}>
            <CiCreditCard1 size={25} style={{ color: "#F7DB89", paddingLeft: '5px' }} />
            <input className={styles.whiteInput} style={{ border: "none" }} placeholder="??? Vui l??ng nh???p s??? t??i kho???n" required value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={styles.submit} type='submit'>X??c nh???n</button>
          <button className={styles.cancel} onClick={() => navigate('/withdraw')}>H???y</button >
        </div>
      </div>
    </form>
  )
}

export default AddAccount