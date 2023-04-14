import InnerHeader from "../../components/InnerHeader"
import styles from './Deposit.module.css'
import { useState } from "react";
import { APIMakeDepositRequest } from "../../helpers/APIs/TransactionAPI";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import PopupErrorModal from "../../components/PopupErrorModal";
import { MdContentCopy } from "react-icons/md";
import { addCommasToInput } from "../../helpers/NumberHelper";
import CustomerSupportAnimatedItem from "../../components/CustomerSupportAnimatedItem";
import { VscArrowSmallDown } from "react-icons/vsc";
// import { Box, Modal } from "@mui/material";
// import { AiOutlineArrowDown, AiOutlineClose } from "react-icons/ai";
// import { APIUser } from "../../helpers/APIs/UserAPIs";
// import UserContext from "../../helpers/Context/user-context";

const DepositStep2 = ({ amount, selectedBank, userCredential, isInitalDeposit }) => {
  const [invoiceFile, setInvoiceFile] = useState();
  const [showInvoiceFile, setShowInvoiceFile] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [imgModal, setImgModal] = useState(false);
  // const [userName, setUserName] = useState();
  // const [showErrorForInitalDeposit, setShowErrorForInitalDeposit] = useState(false);
  // const [transaction, setTransaction] = useState(null);
  // const [invoiceCaption, setInvoiceCaption] = useState('Không bắt buộc')
  // const ctx = useContext(UserContext);

  // user API
  // useEffect(() => {
  //   const userData = async () => {
  //     const userAPI = await APIUser()
  //     setUserName(userAPI.phone);
  //   }
  //   userData();
  // }, []);

  // Send Initial Deposit req
  // useEffect(() => {
  //   if (isInitalDeposit) {
  //     sendInitalDepositRequest();
  //   }
  // }, [selectedBank]);

  // initial Deposit req func
  // const sendInitalDepositRequest = async () => {
  //   const tr = await sendDepositRequest();
  //   if (tr) {
  //     setTransaction(tr);
  //   }
  // }

  // navigating redirect
  const navigate = useNavigate()

  // img file
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setInvoiceFile(event.currentTarget.files[0])
      setShowInvoiceFile(URL.createObjectURL(event.target.files[0]));
    }
  }

  // user card data
  const items = [
    { label: "Ngân hàng nạp tiền", value: selectedBank ? selectedBank.bank_name : "Đang tải..", copy: false },
    { label: "Tên tài khoản nhận", value: selectedBank ? selectedBank.bank_account_name : "Đang tải..", copy: false, fontSmall: true },
    { label: "Số tài khoản", value: selectedBank ? selectedBank.bank_account_number.replace(/\d{4}(?=.)/g, '$& ') : "Đang tải..", copy: true },
    { label: "Số tiền nạp", value: amount ? addCommasToInput(amount) : "Đang tải..", copy: false },
    { label: "Nội dung chuyển khoản", value: userCredential.phone ? userCredential.phone : "Đang tải..", copy: true, redText: true }
  ];

  // deposit submit
  const sendDepositRequest = async () => {
    if (selectedBank && selectedBank.id && amount) {
      // let newAmount = amount.replace(/,/g, '');
      const x = await APIMakeDepositRequest(amount, selectedBank.id, invoiceFile);
      if (x === 'ERR_FILE_FORMAT_INVALID') {
        setErrorModal(true)
        setErrorMessage("Định dạng ảnh không phù hợp. Vui lòng liên CSKH để được hỗ trợ");
      } else if (!x) {
        setErrorModal(true)
        setErrorMessage("Đã có lỗi trong quá trình nạp tiền. Vui lòng liên hệ Chăm sóc khách hàng");
      } else if(x === "WAIT_PLEASE") {
        setErrorModal(true)
        setErrorMessage("Bạn có yêu cầu đang chờ xử lý. Bạn không thể tạo yêu cầu mới khi đang có yêu cầu chờ xử lý. Vui lòng yêu cầu lại sau.");
      } else {
        return x;
      }
    }
    return null;
  }

  const myDate = new Date()
  //submit func
  const onDepositSubmitClicked = async (e) => {
    e.preventDefault();
    setLoading(true);
    // // if (isInitalDeposit) {
    // // if (transaction) {
    // // console.log(transaction)
    // // const res = await APICheckTransaction(ctx.user);
    // // if (res) {
    // //   return navigate("/");
    // // } else {
    // //   setErrorModal(true)
    // //   setErrorMessage("Đã có lỗi trong quá trình nạp tiền. Vui lòng liên hệ Chăm sóc khách hàng");
    // // }
    // // } else {
    // //   setErrorModal(true)
    // //   setErrorMessage("Đã có lỗi trong quá trình nạp tiền. Vui lòng liên hệ Chăm sóc khách hàng");
    // // }
    // // } 
    // // else {
    // setLoading(true);
    const deposit = await sendDepositRequest();
    if (deposit) {
      if (!userCredential.user_id) {
        // set time for first deposit after registeration
        localStorage.setItem('initialDeposit', myDate)
        navigate('/');
      } else {
        navigate('/transections')
      }
    }
    // }
    setLoading(false);
  }

  return (
    <div className={styles.depositWrapper}>
      <InnerHeader title={"Thông tin nạp tiền"} />
      <div className={styles.deposit1Wrapper}>
        <form onSubmit={onDepositSubmitClicked} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className={styles.section}>
            <div className={styles.depositCard}>
              <div style={{ fontWeight: 'bold', color: '#F7DB89', textAlign:'center' }}>Để » NẠP TIỀN « Chuyển khoản cho chúng tôi theo thông tin bên dưới đây</div>
              <h3 style={{ textAlign: "center", color: "rgb(5, 151, 5)" }}>Lưu ý : 1 điểm = 30.000 VND</h3>
                <div>
                  <span className={styles.label} style={{ textAlign: 'left' }}>Thông tin tiền gửi</span>
                  {items.map((item, index) => <CopyItemComponent key={index} item={item} />)}
                  <div style={{ textAlign: 'center', padding: '0px 5px', fontSize: '14px', color: '#F7DB89' }}>
                    <p>Lưu ý: Điền chính xác mã <strong style={{ color: '#F93B3B', fontSize: '20px' }}>"{userCredential.phone && userCredential.phone}"</strong> vào mục "Nội dung/Lời nhắn"</p>
                    <p>Thiếu NỘI DUNG CHUYỂN KHOẢN, SVW38 sẽ không thể nhận ra khoản chuyển từ Quý khách</p>
                  </div>
                  <div style={{ paddingLeft: "5px" }}>
                    <span className={styles.copyLabel} style={{ fontSize: '18px' }}>Hình ảnh hóa đơn</span><br />
                    <div><VscArrowSmallDown size={30} color='#F7DB89' /></div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', paddingright: '5px', marginBottom: '10px' }}>
                      <div className={styles.invoiceFileInputWrapper}>
                        <input type="file" accept="image/*" onChange={onImageChange} className={styles.invoiceFileInput} />
                        <div style={{ fontSize: '12px', color: '#F7DB89', fontWeight: 'bold' }}>Không bắt buộc</div>
                      </div>
                      {invoiceFile && <span style={{ color: '#F93B3B', cursor: 'pointer', textDecoration: 'underline', fontSize: '11px' }} onClick={() => { setInvoiceFile(''); setShowInvoiceFile('') }}>Remove</span>}
                    </div>
                  </div>

                  {showInvoiceFile && 
                    <div className={styles.invoiceImgWrapper}>
                      <img src={showInvoiceFile} alt='invice'/>
                    </div>
                  }
                  {loading ? <div className={styles.loader}> <CircularProgress style={{'color': '#F7DB89'}}/></div> : ""}
                  {/*{isInitalDeposit ? <div className={`${styles.whiteNotice} ${styles.small}`}>Sau khi chuyển khoản thành công, quý khách vui lòng nhấn vào ( kích hoạt tài khoản) để nhận tài khoản của mình. <AiOutlineArrowDown /> </div> : ""}
                  {showErrorForInitalDeposit ? <div style={{ color: 'red', textAlign: "center", fontSize: "0.9rem" }}>Tài khoản chưa kích hoạt hoặc Quý khách chưa chuyển khoản!</div> : ""}*/}
                </div>
              <button type="submit" className={styles.submitButton} >
                {loading ? "Đang tải" : isInitalDeposit ? "Kích hoạt tài khoản" : "Hoàn Tất"}
              </button>
              {isInitalDeposit ? <div style={{ color: "white", textAlign: "center", fontSize: "0.9rem", marginTop: "10px" }}>
                Nếu sau khi chuyển khoản thành công nhưng chưa Kích Hoạt được tài khoản , quý khách vui lòng liên hệ CSKH <CustomerSupportAnimatedItem />
              </div> : ""}
            </div>
          </div>
        </form >
      </div>
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
      <div style={{ textAlign: 'left' }}>
        <span className={styles.copyLabel}>{item.label}</span><br />
        <span className={`${styles.copyValue} ${item.copy && styles.copyBtnValue} ${item.fontSmall && styles.smallValue} ${item.redText && styles.redText}`}>{item.value}</span>
      </div>
      {item.copy && <span className={styles.copyButton} onClick={onCopyClicked}>
        <span>Copy</span>
        <MdContentCopy size={18} />
      </span>}
    </div>
  )
}

export default DepositStep2