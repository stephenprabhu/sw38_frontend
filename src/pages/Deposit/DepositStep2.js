import InnerHeader from "../../components/InnerHeader"
import styles from './Deposit.module.css'
import { useEffect, useState } from "react";
import { APIMakeDepositRequest } from "../../helpers/APIs/TransactionAPI";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Modal } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import PopupErrorModal from "../../components/PopupErrorModal";
import { APIUser } from "../../helpers/APIs/UserAPIs";

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

  // user API
  useEffect(() => {
    const userData = async () => {
      const userAPI = await APIUser()
      setUserName(userAPI.phone)
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
    if (newAmount && selectedBank) {
      const x = await APIMakeDepositRequest(newAmount, selectedBank.id, invoiceFile);
      if (x === 'ERR_FILE_FORMAT_INVALID') {
        setErrorModal(true)
        setErrorMessage("Định dạng ảnh không phù hợp. Vui lòng liên CSKH để được hỗ trợ");
      } else if (!x) {
        setErrorModal(true)
        // fix the server error API
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
    <div className={styles.formOverlay}>
      <InnerHeader title={"Thông tin nạp tiền"} />
      <div className={styles.formWrapper}>
        <form onSubmit={onDepositSubmitClicked} className={styles.deposit2Form}>
          <h3 style={{ textAlign: "center", color: "red" }}>Lưu ý : 1 điểm = 30.000 VND</h3>
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
          {loading ? <CircularProgress style={{ marginTop: '5px' }} /> : ""}
          <div className={`${styles.submitButton}`}>
            <button className={`${styles.depositButton}  ${styles.cancel}`} onClick={onPrevStepClicked}>Trở Về</button>
            <button className={`${styles.depositButton} ${styles.final}`} disabled={loading} type="submit">{loading ? "Đang tải" : "Hoàn Tất"}</button>
          </div>
        </form>
      </div>
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