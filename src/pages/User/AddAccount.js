import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import vietnamBankArray from '../../data/vn-banks'
import styles from "./AddAccount.module.css"
import { AddAccountAPI } from '../../helpers/APIs/AddAccountAPI';
import { useNavigate } from 'react-router-dom';
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { bankListAPI } from '../../helpers/APIs/WithdrawAPI';
// import { EditAccount } from '../../helpers/APIs/EditAccount';
// import axios from 'axios';

const AddAccount = () => {
  const [bankName, setBankName] = useState(vietnamBankArray[0]);
  const [accNumber, setAccNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [bankExist, setBankExist] = useState(false)
  // const [editBank, setEditBank] = useState()

  const navigate = useNavigate()
  // const param = useParams();

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
    <Layout title="Thêm tài khoản ngân hàng">
      <form onSubmit={addAccount} className={styles.pageOverlay}>
        <div className={styles.innerContentWrapper}>
          <div className={`${styles.helptext} ${checkIfOnlyCapital(userName) ? "" : styles.danger}`}>Tên tài khoản viết IN HOA,<br/> không dấu, không có số.</div>
          
          <div className={styles.formOverlay}>
            <div className={styles.addAccountFormWrapper}>
              
              <div>
                <div className={styles.requiredLabel}><span>*</span>Số điện thoại</div>
                <div className={styles.inputItem} style={{ marginTop: "5px" }}>
                  <input
                    className={styles.whiteInput}
                    style={{ border: "none" }}
                    readOnly={bankExist}
                    placeholder="＊ Tên tài khoản"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div>
                <div className={styles.requiredLabel}><span>*</span>Ngân Hàng</div>
                <div className={styles.addBankSelectWrapper}>
                  <select required value={bankName} onChange={(e) => setBankName(e.target.value)}>
                    {vietnamBankArray.map((val, index) => <option key={index}>{val}</option>)}
                  </select>
                  <span><MdOutlineKeyboardArrowDown/></span>
                </div>
              </div>

              <div>
                <div className={styles.requiredLabel}><span>*</span>Số Tài Khoản</div>
                <div className={styles.inputItem}>
                  <CiCreditCard1 size={25} style={{ color: "white", paddingLeft: '8px' }} />
                  <input className={styles.whiteInput} style={{ border: "none" }} placeholder="＊ Vui lòng nhập số tài khoản" required value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
                </div>
              </div>

              <div className={styles.accActionButtons}>
                <button className={styles.submitButton} type='submit'>Xác nhận</button>
                <button className={styles.cancelButton} onClick={() => navigate('/withdraw')}>Hủy</button>
              </div>

              </div>
          </div>
        
        </div>
      </form>
    </Layout>
  )
}

export default AddAccount