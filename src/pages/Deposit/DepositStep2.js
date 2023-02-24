import InnerHeader from "../../components/InnerHeader"
import styles from './Deposit.module.css'
import { useEffect, useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { APIMakeDepositRequest } from "../../helpers/APIs/TransactionAPI";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

const DepositStep2 = ({ amount, onPrevStepClicked, selectedBank }) => {
  const [invoiceFile, setInvoiceFile] = useState();
  const [accountNo, setAccountNo] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState()
  //   <div className={styles.bankDetailItem}>
  // //   <div>
  // //     <span className={styles.grayLabel}>Nội dung chuyển khoản</span><br />
  // //     <span className={styles.grayValue}>userName && userName</span>
  // //   </div>
  // //   <button type="button" className={styles.copyButton} onClick={() => navigator.clipboard.writeText(formate(Math.floor((amount.replace(/,/g, '') / 30000))))}>Copy</button>
  // // </div>
  useEffect(() => {
    const userData = async () => {
      const userAPI = await axios.get('https://bo.ssv388.info/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
      setUserName(userAPI.data.phone)
    }
    userData()
  }, [])

  const items = [
    { label: "Nạp tiền tài khoản", value: userName && userName },
    { label: "Nạp tiền ngân hàng", value: selectedBank.bank_name },
    { label: "Tên tài khoản nhận", value: selectedBank.bank_account_name },
    { label: "Số tài khoản", value: selectedBank.bank_account_number }
  ];

  // convert to thousand formate
  const formate = (x) => {
    return (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }

  // navigating redirect
  const navigate = useNavigate()

  //submit func
  const onDepositSubmitClicked = async (e) => {
    setLoading(true);
    e.preventDefault();
    let newAmount = amount.replace(/,/g, '')
    if (newAmount < 100000) {
      setErrorMessage('Vui lòng chọn trên 100,000')
    } else if (newAmount > 100000000) {
      setErrorMessage('Vui lòng chọn dưới 100,000,000')
    } else if (!invoiceFile) {
      setErrorMessage('Nhấn vào đây để tải lên hình ảnh hóa đơn')
    } else if (!accountNo) {
      setErrorMessage('Vui lòng nhập số tài khoản người chuyển')
    } else if (accountNo.length < 6) {
      setErrorMessage('Số tài khoản không đúng')
    } else if (invoiceFile && accountNo && newAmount && selectedBank) {
      const x = await APIMakeDepositRequest(newAmount, accountNo, selectedBank.id, invoiceFile);
      if (!x) {
        setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
      } else {
        navigate('/transections')
      }
    } else {
      console.log('Api Fail')
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <InnerHeader title={"Thông tin nạp tiền"} />
      <form onSubmit={onDepositSubmitClicked} style={{ flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }} >
        <div style={{ flexGrow: 1 }}>
          <h3 style={{ textAlign: "center", color: "red" }}>Lưu ý : 1 điểm = 30.000 VND</h3>
          <div className={styles.section2}>
            <span className={styles.label}>Thông tin tiền gửi</span>
            {items.slice(0, 4).map((item, index) => <CopyItemComponent key={index} item={item} />)}
            <div className={styles.bankDetailItem}>
              <div>
                <span className={styles.grayLabel}>Số tiền nạp</span><br />
                <span className={styles.grayValue}>{formate(amount)}</span>
              </div>
              <button type="button" className={styles.copyButton} onClick={() => navigator.clipboard.writeText(formate(amount))}>Copy</button>
            </div>
            <div className={styles.bankDetailItem}>
              <div>
                <span className={styles.grayLabel}>Số Điểm</span><br />
                <span className={styles.grayValue}>{formate(Math.floor((amount.replace(/,/g, '') / 30000) >= 1 ? amount.replace(/,/g, '') / 30000 : 0))}</span>
              </div>
              <button type="button" className={styles.copyButton} onClick={() => navigator.clipboard.writeText(formate(Math.floor((amount.replace(/,/g, '') / 30000))))}>Copy</button>
            </div>


            <div style={{ padding: "10px 10px 20px 0px" }}>
              <span className={styles.grayLabel}>Hình ảnh</span><br />
              <input type="file" label="File" accept="image/*" onChange={e => setInvoiceFile(e.currentTarget.files[0])} />
            </div>
            <span className={styles.grayLabel}>Tài khoản người chuyển</span>
            <div className={styles.inputItem} style={{ marginTop: "10px" }}>
              <CiCreditCard1 size={25} style={{ color: "gray" }} />
              <input value={accountNo} type='number' className={styles.whiteInput} style={{ border: "none" }} placeholder="＊ Vui lòng nhập số tài khoản"
                onChange={(e) => e.currentTarget.value.length < 18 && setAccountNo(e.currentTarget.value)}
              />
            </div>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
          </div>
          {loading ? <CircularProgress style={{ marginTop: '5px' }} /> : ""}
        </div>
        <div className={`${styles.submitButton}`}>
          <button className={`${styles.depositButton}  ${styles.cancel}`} onClick={onPrevStepClicked}>Trở Về</button>
          <button className={`${styles.depositButton} ${styles.final}`} disabled={loading} type="submit">{loading ? "Đang tải" : "Hoàn Tất"}</button>
        </div>
      </form>
    </div>
  )
}

const CopyItemComponent = ({ item }) => {

  const onCopyClicked = () => {
    navigator.clipboard.writeText(item.value);
  }

  return (
    <div className={styles.bankDetailItem}>
      <div>
        <span className={styles.grayLabel}>{item.label}</span><br />
        <span className={styles.grayValue}>{item.value}</span>
      </div>
      <button type="button" className={styles.copyButton} onClick={onCopyClicked}>Copy</button>
    </div>
  )
}

export default DepositStep2