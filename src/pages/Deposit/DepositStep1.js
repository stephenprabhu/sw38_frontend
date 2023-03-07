import React, { useState, useEffect, useContext } from 'react'
import styles from './Deposit.module.css'
import InnerHeader from '../../components/InnerHeader'
import { APIGetCompanyBanks } from '../../helpers/APIs/BankAPIs';
import UserContext from '../../helpers/Context/user-context';
import { IconButton } from '@mui/material';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { addCommasToInput, addCommasToNumber } from '../../helpers/NumberHelper';

const DepositStep1 = ({ amount, setAmount, onNextStepClicked, selectedBank, setSelectedBank }) => {

  const [companyBanks, setCompanyBanks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const ctx = useContext(UserContext);
  const [stringAmount, setStringAmount] = useState('');
  useEffect(() => {
    getCompanyBanks();
  }, []);

  //  get company all bank list 
  const getCompanyBanks = async () => {
    if (ctx.user) {
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
  }

  const onDepositAmountChange = val => {
    setAmount(val.replace(/,/g, ''));
    setStringAmount(addCommasToInput(val));
  }


  const onContinueClicked = () => {
    if (!amount || amount < 150000 || amount > 90000000 || !selectedBank) {
      return;
    }
    onNextStepClicked();
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
        <div>
          <span className={styles.label}>* Số tiền cần nạp ? (Tỷ lệ đổi: <span style={{ color: 'red', fontSize: '18px' }}>30,000 VNĐ = 1 điểm</span>)</span>
          <div className={styles.inputItem}>
            <i className={styles.adjornment}>₫</i>
            <input value={stringAmount} onChange={e => { onDepositAmountChange(e.currentTarget.value) }} type="text" className={styles.whiteInput} style={{ border: "none" }} />
            {amount && <IconButton size='small' sx={{}} onClick={() => { setAmount(""); setStringAmount("") }}>{<AiOutlineCloseCircle style={{ color: '#F7DB89' }} />}</IconButton>}
          </div>
          {/*amount error*/}
          {amount && amount < 150000 ? <p style={{ color: 'red', textAlign: 'center', fontSize: '0.85rem', margin: '10px' }}>Số tiền gửi tối thiểu từ 150,000 VNĐ trở lên</p> : ''}
          {amount && amount > 90000000 ? <p style={{ color: 'red', textAlign: 'center', fontSize: '0.85rem', margin: '10px' }}>Số tiền gửi vượt quá giới hạn 90 triệu VNĐ</p> : ''}
          {/*Points Buttons*/}
          {amount && <div className={styles.depositButtonSection}>
            <button onClick={() => onDepositAmountChange((amount + '00000').substring(0, 6))} className={styles.depositButton}>
              {addCommasToInput((amount + '00000').substring(0, 6))}
            </button>
            <button onClick={() => onDepositAmountChange((amount + '000000').substring(0, 7))} className={styles.depositButton}>
              {addCommasToInput((amount + '000000').substring(0, 7))}
            </button>
            <button onClick={() => onDepositAmountChange((amount + '0000000').substring(0, 8))} className={styles.depositButton}>
              {addCommasToInput((amount + '0000000').substring(0, 8))}
            </button>
          </div>}
          <div className={styles.maxMinWrapper}>
            <span className={`${styles.label} ${styles.maxMin}`}>Nạp Min: 150, 000 VND</span>
            <span className={`${styles.label} ${styles.maxMin}`}>Nạp Max: 90,000,000 VND</span>
          </div>
        </div>
        <div className={styles.circleTextOverlay}>
          {amount && <p style={{ fontSize: '0.85rem', color: '#F7DB89', flexGrow: 1 }}>Bạn sẽ nhận được <strong style={{ color: 'red' }}>{((amount.replace(/,/g, '')) / 30000).toFixed(2)} điểm</strong></p>}
          {amount && <div className={styles.pointsCircleWraper}>
            <div className={styles.pointCircle}>
              {addCommasToNumber(((amount.replace(/,/g, '')) / 30000).toFixed(2))} <br />
              <span style={{ paddingTop: '5px' }}>điểm</span>
            </div>
          </div>}
        </div>
        <button
          className={`${styles.submitButton} ${!amount || amount < 150000 || amount > 90000000 ? styles.disabled : ""}`}
          onClick={onContinueClicked}
        >
          Tiếp theo
        </button>
      </div >
    </div >
  )
}


export default DepositStep1