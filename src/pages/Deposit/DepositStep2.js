import InnerHeader from "../../components/InnerHeader"
import styles from './Deposit.module.css'
import { useEffect, useState } from "react";
import { APIMakeDepositRequest } from "../../helpers/APIs/TransactionAPI";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { Box, Modal } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import PopupErrorModal from "../../components/PopupErrorModal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',

};

const DepositStep2 = ({ amount, onPrevStepClicked, selectedBank }) => {
  const [invoiceFile, setInvoiceFile] = useState();
  const [showInvoiceFile, setShowInvoiceFile] = useState()
  const [imgModal, setImgModal] = useState(false)
  // const [accountNo, setAccountNo] = useState(null)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState()

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
    { label: "Ngân hàng nạp tiền", value: selectedBank.bank_name },
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
    e.preventDefault();
    setLoading(true);
    let newAmount = amount.replace(/,/g, '')
  if (!invoiceFile) {
      setErrorModal(true)
      setErrorMessage('Nhấn vào đây để tải lên hình ảnh hóa đơn')
    } else if (invoiceFile && newAmount && selectedBank) {
      const x = await APIMakeDepositRequest(newAmount, selectedBank.id, invoiceFile);
      console.log(x);
      if (!x) {
        setErrorModal(true)
        setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
      } else {
        navigate('/transections')
      }
    } else {
      console.log('Api Fail')
    }
    setLoading(false)
  }

  // img file
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setInvoiceFile(event.currentTarget.files[0])
      setShowInvoiceFile(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <InnerHeader title={"Thông tin nạp tiền"} />
      <form onSubmit={onDepositSubmitClicked} className={styles.deposit2Form} >
        <div style={{ flexGrow: 1 }}>
          <h3 style={{ textAlign: "center", color: "red" }}>Lưu ý : 1 điểm = 30.000 VND</h3>
          <div className={styles.section2}>
            <span className={styles.label}>Thông tin tiền gửi</span>
            {items.slice(0, 3).map((item, index) => <CopyItemComponent key={index} item={item} />)}
            <div className={styles.bankDetailItem}>
              <div>
                <span className={styles.grayLabel}>Số tiền nạp</span><br />
                <span className={styles.grayValue}>{formate(amount)}</span>
              </div>
              <button type="button" className={styles.copyButton} onClick={() => navigator.clipboard.writeText(formate(amount))}>Copy</button>
            </div>

            <div className={styles.bankDetailItem}>
              <div>
                <span className={styles.grayLabel}>Nội dung chuyển khoản</span><br />
                <span className={styles.grayValue}>{userName && userName}</span>
              </div>
              <button type="button" className={styles.copyButton} onClick={() => navigator.clipboard.writeText(userName)}>Copy</button>
            </div>

            <div style={{ padding: "10px 10px 20px 0px" }}>
              <span className={styles.grayLabel}>Hình ảnh hóa đơn</span><br />
              <input type="file" label="File" accept="image/*" onChange={onImageChange} style={{ marginTop: '5px' }} />
            </div>
            {showInvoiceFile && <img src={showInvoiceFile} alt='invice' width={200} height={200} style={{ borderRadius: '10px' }} onClick={() => setImgModal(true)} />}
          </div>
          {loading ? <CircularProgress style={{ marginTop: '5px' }} /> : ""}
        </div>
        <div className={`${styles.submitButton}`}>
          <button className={`${styles.depositButton}  ${styles.cancel}`} onClick={onPrevStepClicked}>Trở Về</button>
          <button className={`${styles.depositButton} ${styles.final}`} disabled={loading} type="submit">{loading ? "Đang tải" : "Hoàn Tất"}</button>
        </div>
      </form>
      <Modal open={imgModal} onClose={() => setImgModal(false)}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
            <h3>Hình ảnh</h3>
            <AiOutlineClose size={30} color='white' onClick={() => setImgModal(false)} />
          </Box>
          <img src={showInvoiceFile} alt='invice' width='100%' style={{ maxHeight: '90%', flexGrow: 1 }} onClick={''} />
        </Box>
      </Modal>
      <PopupErrorModal message={errorMessage} show={errorModal} hideModal={() => setErrorModal(false)} />
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