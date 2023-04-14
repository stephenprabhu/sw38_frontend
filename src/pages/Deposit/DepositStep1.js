// import { useState } from 'react'
import styles from './Deposit.module.css'
import InnerHeader from '../../components/InnerHeader'
import { IconButton } from '@mui/material';
import { IoMdCloseCircle } from "react-icons/io";
import { addCommasToInput, addCommasToNumber } from '../../helpers/NumberHelper';

const DepositStep1 = ({ amount, setAmount, onNextStepClicked, selectedBank, setSelectedBank, companyBanks, errorMessage }) => {

  // const [stringAmount, setStringAmount] = useState('');

  const onDepositAmountChange = val => {
    // console.log(e);
    // const val = e.target.value;
    // setAmount(val);
    // setStringAmount(val);
    // console.log(val)
    // let cleanComas = val.replace(/,/g, '');
    // cleanComas = cleanComas.replace(/\./g, '');
    if (!isNaN(val)) {
      if (val.length <= 9) {
        setAmount(val);
        // setStringAmount(val);
      } else {
        let value = val.substring(0, 9)
        setAmount(value)
        // setStringAmount(val.substring(0, 9))
      }
    }
  }

  const onContinueClicked = () => {
    if (!amount || amount < 150000 || amount > 90000000 || !selectedBank) {
      return;
    }
    onNextStepClicked();
  }

  const sugestedAmount = [{ label: '150K', value: '150000' }, { label: '300K', value: '300000' }, { label: '900K', value: '900000' }
    , { label: '3 Triệu', value: '3000000' }, { label: '30 Triệu', value: '30000000' }]
    
  //   {amount && <div className={styles.depositButtonSection}>
  //   <button onClick={() => onDepositAmountChange((amount + '00000').substring(0, 6))} className={styles.depositButton}>
  //     {addCommasToInput((amount + '00000').substring(0, 6))}
  //   </button>
  //   <button onClick={() => onDepositAmountChange((amount + '000000').substring(0, 7))} className={styles.depositButton}>
  //     {addCommasToInput((amount + '000000').substring(0, 7))}
  //   </button>
  //   <button onClick={() => onDepositAmountChange((amount + '0000000').substring(0, 8))} className={styles.depositButton}>
  //     {addCommasToInput((amount + '0000000').substring(0, 8))}
  //   </button>
  // </div>}

  return (
    <div className={styles.depositWrapper}>
      <InnerHeader title={"Nạp Tiền"} />
      <div className={styles.deposit1Wrapper}>
        <div className={styles.section}>
          <div className={styles.depositCard}>
            <span className={styles.label}>Các kênh thanh toán</span>
            {errorMessage ? <span style={{ color: 'red', padding: '0px 10px' }}>Đã xảy ra lỗi, vui lòng liên hệ Chăm sóc khách hàng </span> : ""}
            <div className={styles.companyBankSection}>
              {companyBanks && companyBanks.length ? companyBanks.map(bank => (
                <div
                  className={`${styles.singleBankItem} ${selectedBank && selectedBank.id === bank.id ? styles.active : ''}`}
                  key={bank.id}
                  onClick={() => setSelectedBank(bank)}
                >
                  <img src={bank.bank_image} alt='bankImg'/>
                </div>
              )) : ""}
            </div>
            <div>
              <span className={styles.label} style={{ textAlign: 'left' }}>* Số tiền cần nạp ? (Tỷ lệ đổi: <span style={{ color: '#F93B3B', fontSize: '18px' }}>30,000 VNĐ = 1 điểm</span>)</span>
              <div className={styles.inputItem}>
                <i className={styles.adjornment}>₫</i>
                <input value={amount} onChange={e => onDepositAmountChange(e.target.value)} type="number" className={styles.whiteInput} style={{ border: "none" }} />
                {amount && <IconButton size='small' onClick={() => { setAmount(""); }}>{<IoMdCloseCircle style={{ color: '#F7DB89' }} />}</IconButton>}
              </div>
              {/*amount error*/}
              {amount && amount < 150000 ? <p className={styles.errorMsg}>Số tiền gửi tối thiểu từ 150,000 VNĐ trở lên</p> : ''}
              {amount && amount > 90000000 ? <p className={styles.errorMsg}>Số tiền gửi vượt quá giới hạn 90 triệu VNĐ</p> : ''}
              {/*Points Buttons*/}
              {amount && 
                <div className={styles.depositButtonSection}>
                  {sugestedAmount.map((item) => (
                    <button onClick={() => onDepositAmountChange(item.value)} className={styles.depositButton} key={item.label}>
                      {item.label}
                    </button>
                  ))}
                </div>
              }
              <div className={styles.maxMinWrapper}>
                <span className={`${styles.label} ${styles.maxMin}`}>Nạp Min: 150, 000 VND</span>
                <span className={`${styles.label} ${styles.maxMin}`}>Nạp Max: 90,000,000 VND</span>
              </div>
            </div>
            <div className={styles.circleTextOverlay}>
              {amount && <p style={{ fontSize: '0.85rem', color: '#F7DB89', flexGrow: 1 }}>
                Bạn sẽ nhận được <strong style={{ color: '#F93B3B' }}><span style={{ color: 'green', fontWeight: 'bold' }}>{addCommasToInput(amount)} VND</span> = {((amount.replace(/,/g, '')) / 30000).toFixed(2)} điểm</strong>
              </p>}
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
          </div>
        </div >
      </div >
    </div>
  )
}


export default DepositStep1