import React, { useState, useEffect, useContext } from 'react'
import styles from './Deposit.module.css'
import InnerHeader from '../../components/InnerHeader'
import { APIGetCompanyBanks } from '../../helpers/APIs/BankAPIs';
import UserContext from '../../helpers/Context/user-context';
import { IconButton } from '@mui/material';
import { AiOutlineCloseCircle } from "react-icons/ai";

const DepositStep1 = ({ amount, setAmount, onNextStepClicked, selectedBank, setSelectedBank }) => {

  const [companyBanks, setCompanyBanks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const ctx = useContext(UserContext);

  // const amountsArray = [
  //   { value: "150,000", label: "150K" },
  //   { value: "300,000", label: "300K" },
  //   { value: "900,000", label: "900K" },
  //   { value: "3,000,000", label: "3M" },
  //   { value: "9,000,000", label: "9M" },
  //   { value: "18,000,000", label: "18M" },
  //   { value: "30,000,000", label: "30M" }
  // ];

  // {amountsArray.map((amountObj, index) => (
  //   <button
  //     key={index}
  //     onClick={() => setAmount(amountObj.value)}
  //     className={styles.depositButton}
  //   // className={`${styles.depositButton} ${amount === amountObj.value ? styles.active : ""}`}
  //   >
  //     {amountObj.label}
  //   </button>
  // ))}

  useEffect(() => {
    getCompanyBanks();
  }, [])

  //  get company all bank list 
  const getCompanyBanks = async () => {
    const x = await APIGetCompanyBanks(ctx.user);
    if (!x) {
      setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
    } else {
      if (x && x.length) {
        setCompanyBanks(x);
        setSelectedBank(x[0]);
      }
    }
  }
  // formate
  const formate = (x) => {
    return (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }

  return (
    <div className={styles.deposit1Wrapper}>
      <InnerHeader title={"Nạp Tiền"} />
      <div className={styles.section}>
        <span className={styles.label}>Các kênh thanh toán</span>
        {errorMessage ? <span style={{ color: 'red', marginLeft: '10px' }}>Error Fetching Company Banks</span> : ""}
        <div className={styles.companyBankSection}>
          {companyBanks && companyBanks.length ? companyBanks.map(bank => (
            <div
              className={`${styles.singleBankItem} ${selectedBank && selectedBank.id === bank.id ? styles.active : ''}`}
              key={bank.id}
              onClick={() => setSelectedBank(bank)}
            >
              <img src={bank.bank_image} />
            </div>
          )) : ""}
        </div>
        <div >
          <span className={styles.label}>* Số tiền cần nạp ? (Tỷ lệ đổi: <span style={{ color: 'red', fontSize: '18px' }}>30,000 VNĐ = 1 điểm</span>)</span>
          <div className={styles.inputItem}>
            <i className={styles.adjornment}>₫</i>
            <input value={amount} onChange={e => { setAmount(e.currentTarget.value) }} type="text" className={styles.whiteInput} style={{ border: "none" }} />
            {amount && <IconButton size='small' sx={{ marginRight: '2px' }} onClick={() => setAmount('')}>{<AiOutlineCloseCircle />}</IconButton>}
          </div>
          {/*amount error*/}
          {amount && amount < 150000 ? <p style={{ color: 'red', textAlign: 'center', fontSize: '0.85rem', margin: '10px' }}>Số tiền gửi tối thiểu từ 150,000 VNĐ trở lên</p> : ''}
          {amount && amount > 90000000 ? <p style={{ color: 'red', textAlign: 'center', fontSize: '0.85rem', margin: '10px' }}>Số tiền gửi vượt quá giới hạn 90 triệu VNĐ</p> : ''}
          {/*Points Buttons*/}
          {amount && <div className={styles.depositButtonSection}>
            <button onClick={() => setAmount((amount + '00000').substring(0, 6))} className={styles.depositButton}>
              {formate((amount + '00000').substring(0, 6))}
            </button>
            <button onClick={() => setAmount((amount + '000000').substring(0, 7))} className={styles.depositButton}>
              {formate((amount + '000000').substring(0, 7))}
            </button>
            <button onClick={() => setAmount((amount + '0000000').substring(0, 8))} className={styles.depositButton}>
              {formate((amount + '0000000').substring(0, 8))}
            </button>
          </div>}
          <div className={styles.maxMinWrapper}>
            <span className={`${styles.label} ${styles.maxMin}`}>Nạp Min: 150, 000 VND</span>
            <span className={`${styles.label} ${styles.maxMin}`}>Nạp Max: 90,000,000 VND</span>
          </div>
          {amount && <p style={{ fontSize: '0.85rem' }}>Bạn sẽ nhận được <strong style={{ color: 'red' }}>{((amount.replace(/,/g, '')) / 30000).toFixed(2)} điểm</strong></p>}
        </div>
        {amount && <div className={styles.pointsCircleWraper}>
          <div className={styles.pointCircle}>
            {formate(((amount.replace(/,/g, '')) / 30000).toFixed(2))} <br />
            <span style={{ paddingTop: '5px' }}>điểm</span>
          </div>
        </div>}
      </div >
      <div>
        { }
        <button
          className={`${styles.submitButton} ${!amount || amount < 150000 || amount > 90000000 ? styles.disabled : ""}`}
          onClick={onNextStepClicked}
          // onClick={() => console.log(amount)}
          disabled={!amount && amount < 150000 && amount > 90000000 && !selectedBank}
        >
          Tiếp theo
        </button>
      </div>
    </div >
  )
}


export default DepositStep1