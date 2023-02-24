import React, { useState, useEffect, useContext } from 'react'
import styles from './Deposit.module.css'
import InnerHeader from '../../components/InnerHeader'
import { APIGetCompanyBanks } from '../../helpers/APIs/BankAPIs';
import UserContext from '../../helpers/Context/user-context';

const DepositStep1 = ({ amount, setAmount, onNextStepClicked, selectedBank, setSelectedBank }) => {

  const [companyBanks, setCompanyBanks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const ctx = useContext(UserContext);

  const amountsArray = [
    { value: "150,000" },
    { value: "300,000" },
    { value: "900,000" },
    { value: "1,200,000" },
    { value: "1,500,000" },
    { value: "3,000,000" },
    { value: "30,000,000" }
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
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
          <span className={styles.label}>* Số tiền nạp</span>
          <div className={styles.inputItem}>
            <i className={styles.adjornment}>₫</i>
            <input value={amount} onChange={e => { setAmount(e.currentTarget.value) }} type="text" className={styles.whiteInput} style={{ border: "none" }} />
          </div>
          <div className={styles.depositButtonSection}>
            {amountsArray.map((amountObj, index) => (
              <button
                key={index}
                onClick={() => setAmount(amountObj.value)}
                className={`${styles.depositButton} ${amount === amountObj.value ? styles.active : ""}`}
              >
                {amountObj.value}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: '10px' }}>
            <span className={styles.label} style={{ padding: '0px' }}>Nạp Min: 150, 000 VND</span>
            <span className={styles.label} style={{ padding: '0px' }}>Nạp Max: 90,000,000 VND</span>
            <span className={styles.label} style={{ padding: '0px', color: 'red' }}>30,000 VND = 1 điểm</span>
          </div>

          {amount && <p>Bạn sẽ nhận được <strong style={{ color: 'red' }}>{formate(Math.floor((amount.replace(/,/g, '') / 30000) >= 1 ? amount.replace(/,/g, '') / 30000 : 0))} điểm</strong></p>}
        </div>
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