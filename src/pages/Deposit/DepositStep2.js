import InnerHeader from "../../components/InnerHeader"
import styles from './Deposit.module.css'
import { useEffect, useState, useContext } from "react";
import { APICheckTransaction, APIMakeDepositRequest } from "../../helpers/APIs/TransactionAPI";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Modal } from "@mui/material";
import { AiOutlineArrowDown, AiOutlineClose } from "react-icons/ai";
import PopupErrorModal from "../../components/PopupErrorModal";
import { APIUser } from "../../helpers/APIs/UserAPIs";
import { MdContentCopy } from "react-icons/md";
import { addCommasToInput } from "../../helpers/NumberHelper";
import CustomerSupportAnimatedItem from "../../components/CustomerSupportAnimatedItem";
import UserContext from "../../helpers/Context/user-context";

const invoiceModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
};

const DepositStep2 = ({ amount, onPrevStepClicked, selectedBank, isInitalDeposit }) => {
  const [invoiceFile, setInvoiceFile] = useState();
  const [showInvoiceFile, setShowInvoiceFile] = useState()
  const [imgModal, setImgModal] = useState(false)
  // const [accountNo, setAccountNo] = useState(null)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState();
  const [showErrorForInitalDeposit, setShowErrorForInitalDeposit] = useState(false);
  const [transaction, setTransaction] = useState(null);
	const ctx = useContext(UserContext);

  // user API
  useEffect(() => {
    const userData = async () => {
      const userAPI = await APIUser()
      setUserName(userAPI.phone);
    }
    userData();

  }, []);


  useEffect(()=> {
    if(isInitalDeposit){
      sendInitalDepositRequest();
    }
  },[selectedBank]);

  const sendInitalDepositRequest = async( ) => {
    const tr = await sendDepositRequest();
    if(tr){
      setTransaction(tr);
    }
  }


  const items =  [
    { label: "Ngân hàng nạp tiền", value: selectedBank ? selectedBank.bank_name : "Đang tải.." },
    { label: "Tên tài khoản nhận", value: selectedBank ? selectedBank.bank_account_name : "Đang tải.." },
    { label: "Số tài khoản", value: selectedBank ? selectedBank.bank_account_number : "Đang tải.." },
    { label: "Số tiền nạp", value: amount ? addCommasToInput(amount) : "Đang tải.." },
    {label: "Nội dung chuyển khoản", value: userName ? userName : "Đang tải.." }
  ];



  // navigating redirect
  const navigate = useNavigate()

  //submit func
  const onDepositSubmitClicked = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(isInitalDeposit){
      if(transaction){
        console.log(transaction)
        const res = await APICheckTransaction(ctx.user, transaction.id);
        if(res){
          return navigate("/?initial=true");
        }else{
          setShowErrorForInitalDeposit(true);
        }
      }else{
        setErrorModal(true)        
        setErrorMessage("Đã có lỗi trong quá trình nạp tiền. Vui lòng liên hệ Chăm sóc khách hàng");
      }
    }else{
      setLoading(true);
      const tr  = await sendDepositRequest();
      if(tr){
        navigate('/transections');
      }
    }
    setLoading(false);
    
  }


  const sendDepositRequest = async() => {
    if(selectedBank && selectedBank.id && amount){
      let newAmount = amount.replace(/,/g, '');
      const x = await APIMakeDepositRequest(newAmount, selectedBank.id, invoiceFile);
      if (x === 'ERR_FILE_FORMAT_INVALID') {
        setErrorModal(true)
        setErrorMessage("Định dạng ảnh không phù hợp. Vui lòng liên CSKH để được hỗ trợ");
      } else if (!x) {
        setErrorModal(true)        
        setErrorMessage("Đã có lỗi trong quá trình nạp tiền. Vui lòng liên hệ Chăm sóc khách hàng");
      } else {
        return x;
      }
    }
    return null;
  }

  // img file
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setInvoiceFile(event.currentTarget.files[0])
      setShowInvoiceFile(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <div className={styles.deposit2Overlay}>
      <InnerHeader title={"Thông tin nạp tiền"} />
      <form onSubmit={onDepositSubmitClicked} className={styles.depositForm}>
        <div style={{ padding: '20px' }}>
          {isInitalDeposit ? <div className={styles.whiteNotice}>Để kích hoạt tài khoản, vui lòng chuyển khoản với thông tin dưới đây</div>  :""}
          <h4 style={{ textAlign: "center", color: "red", marginTop: '0px' }}>Lưu ý : 1 điểm = 30.000 VND</h4>
          <span className={styles.label}>Thông tin tiền gửi</span>
          {items.map((item, index) => <CopyItemComponent key={index} item={item} />)}
          <div className={styles.invoiceImg}>
            <span className={styles.grayLabel}>Hình ảnh hóa đơn</span><br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingright: '5px', marginBottom: '10px' }}>
              <input type="file" label="File" accept="image/*" onChange={onImageChange} className={styles.invoiceImg} title='' />
              {invoiceFile && <span style={{ color: '#F93B3B', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setInvoiceFile(''); setShowInvoiceFile('') }}>Remove</span>}
            </div>
          </div>
          {showInvoiceFile && <img src={showInvoiceFile} alt='invice' width={200} height={200} style={{ borderRadius: '10px' }} onClick={() => setImgModal(true)} />}
          {loading ? <div className={styles.loader}> <CircularProgress /></div> : ""}
          {isInitalDeposit ? <div className={`${styles.whiteNotice} ${styles.small}`}>Sau khi chuyển khoản thành công, quý khách vui lòng nhấn vào ( kích hoạt tài khoản) để nhận tài khoản của mình. <AiOutlineArrowDown /> </div> : ""}
          {showErrorForInitalDeposit ? <div style={{color:'red', textAlign:"center", fontSize:"0.9rem"}}>Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!</div> : ""}
          <button type="submit" className={styles.submitButton} >
            {loading ? "Đang tải" : isInitalDeposit ? "Kích hoạt tài khoản" : "Hoàn Tất"}
          </button>
          {isInitalDeposit ? <div style={{color:"white", textAlign:"center", fontSize: "0.9rem", marginTop:"10px"}}>
            Nếu sau khi chuyển khoản thành công nhưng chưa Kích Hoạt được tài khoản , quý khách vui lòng liên hệ CSKH <CustomerSupportAnimatedItem />
          </div> : ""}
        </div>
      </form >
      <Modal open={imgModal} onClose={() => setImgModal(false)}>
        <Box sx={invoiceModalStyle}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
            <h3>Hình ảnh</h3>
            <AiOutlineClose size={30} color='white' onClick={() => setImgModal(false)} />
          </Box>
          <img src={showInvoiceFile} alt='invoice' width='100%' style={{ maxHeight: '90%', flexGrow: 1 }} onClick={''} />
        </Box>
      </Modal>
      <PopupErrorModal message={errorMessage} show={errorModal} hideModal={() => setErrorModal(false)} />
    </div >
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
      <button type="button" className={styles.copyButton} onClick={onCopyClicked}><div className={styles.copyButton}><MdContentCopy />Copy</div></button>
    </div>
  )
}

export default DepositStep2