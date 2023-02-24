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

  const amountsArray = [
    { value: "150,000", label: "150K" },
    { value: "300,000", label: "300K" },
    { value: "900,000", label: "900K" },
    { value: "3,000,000", label: "3M" },
    { value: "9,000,000", label: "9M" },
    { value: "18,000,000", label: "18M" },
    { value: "30,000,000", label: "30M" }
  ];

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
  // >= 0 ? amount.replace(/,/g, '') / 30000 : 0))
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
          <span className={styles.label}>* Số tiền cần nạp ? (Tỷ lệ đổi: 30,000 VNĐ = 1 điểm)</span>
          <div className={styles.inputItem}>
            <i className={styles.adjornment}>₫</i>
            <input value={amount} onChange={e => { setAmount(e.currentTarget.value) }} type="text" className={styles.whiteInput} style={{ border: "none" }} />
            {amount && <IconButton size='small' sx={{ marginRight: '2px' }} onClick={() => setAmount('')}>{<AiOutlineCloseCircle color='red' />}</IconButton>}
          </div>
          <div className={styles.depositButtonSection}>
            {amountsArray.map((amountObj, index) => (
              <button
                key={index}
                onClick={() => setAmount(amountObj.value)}
                className={`${styles.depositButton} ${amount === amountObj.value ? styles.active : ""}`}
              >
                {amountObj.label}
              </button>
            ))}
          </div>
          <div className={styles.maxMinWrapper}>
            <span className={`${styles.label} ${styles.maxMin}`}>Nạp Min: 150, 000 VND</span>
            <span className={`${styles.label} ${styles.maxMin}`}>Nạp Max: 90,000,000 VND</span>
            <span className={styles.label} style={{ padding: '0px', color: 'red' }}>30,000 VND = 1 điểm</span>
          </div>
          {amount && <p style={{ fontSize: '0.85rem' }}>Bạn sẽ nhận được <strong style={{ color: 'red' }}>{formate(((amount.replace(/,/g, '')) / 30000).toFixed(2))} điểm</strong></p>}
        </div>
        {amount && <div className={styles.pointsCircleWraper}>
          <div className={styles.pointCircle}>
            {formate(((amount.replace(/,/g, '')) / 30000).toFixed(2))} <br />
            <span style={{ paddingTop: '5px' }}>điểm</span>
          </div>
        </div>}
      </div >
      <div>
        <button
          className={`${styles.submitButton} ${!amount ? styles.disabled : ""}`}
          onClick={onNextStepClicked}
          disabled={!amount || !selectedBank}
        >
          Tiếp theo
        </button>
      </div>
    </div >
  )
}


export default DepositStep1