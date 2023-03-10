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

const DepositStep2 = ({ amount, selectedBank, isInitalDeposit }) => {
  const [invoiceFile, setInvoiceFile] = useState();
  const [showInvoiceFile, setShowInvoiceFile] = useState();
  const [imgModal, setImgModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
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

  // Send Initial Deposit req
  useEffect(() => {
    if (isInitalDeposit) {
      sendInitalDepositRequest();
    }
  }, [selectedBank]);

  // initial Deposit req func
  const sendInitalDepositRequest = async () => {
    const tr = await sendDepositRequest();
    if (tr) {
      setTransaction(tr);
    }
  }

  // navigating redirect
  const navigate = useNavigate()

  const sendDepositRequest = async () => {
    if (selectedBank && selectedBank.id && amount) {
      let newAmount = amount.replace(/,/g, '');
      const x = await APIMakeDepositRequest(newAmount, selectedBank.id, invoiceFile);
      if (x === 'ERR_FILE_FORMAT_INVALID') {
        setErrorModal(true)
        setErrorMessage("?????nh d???ng ???nh kh??ng ph?? h???p. Vui l??ng li??n CSKH ????? ???????c h??? tr???");
      } else if (!x) {
        setErrorModal(true)
        setErrorMessage("???? c?? l???i trong qu?? tr??nh n???p ti???n. Vui l??ng li??n h??? Ch??m s??c kh??ch h??ng");
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

  // user card data
  const items = [
    { label: "Ng??n h??ng n???p ti???n", value: selectedBank ? selectedBank.bank_name : "??ang t???i.." },
    { label: "T??n t??i kho???n nh???n", value: selectedBank ? selectedBank.bank_account_name : "??ang t???i.." },
    { label: "S??? t??i kho???n", value: selectedBank ? selectedBank.bank_account_number : "??ang t???i.." },
    { label: "S??? ti???n n???p", value: amount ? addCommasToInput(amount) : "??ang t???i.." },
    { label: "N???i dung chuy???n kho???n", value: userName ? userName : "??ang t???i.." }
  ];

  //submit func
  const onDepositSubmitClicked = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isInitalDeposit) {
      if (transaction) {
        console.log(transaction)
        const res = await APICheckTransaction(ctx.user, transaction.id);
        if (res) {
          return navigate("/?initial=true");
        } else {
          setShowErrorForInitalDeposit(true);
        }
      } else {
        setErrorModal(true)
        setErrorMessage("???? c?? l???i trong qu?? tr??nh n???p ti???n. Vui l??ng li??n h??? Ch??m s??c kh??ch h??ng");
      }
    } else {
      setLoading(true);
      const tr = await sendDepositRequest();
      if (tr) {
        navigate('/transections');
      }
    }
    setLoading(false);
  }

  return (
    <div className={styles.deposit2Overlay}>
      <InnerHeader title={"Th??ng tin n???p ti???n"} />
      <form onSubmit={onDepositSubmitClicked} className={styles.depositForm}>
        <div style={{ padding: '20px' }}>
          {isInitalDeposit ? <div className={styles.whiteNotice}>????? k??ch ho???t t??i kho???n, vui l??ng chuy???n kho???n v???i th??ng tin d?????i ????y</div> : ""}
          <h4 style={{ textAlign: "center", color: "red", marginTop: '0px' }}>L??u ?? : 1 ??i???m = 30.000 VND</h4>
          <span className={styles.label}>Th??ng tin ti???n g???i</span>
          {items.map((item, index) => <CopyItemComponent key={index} item={item} />)}
          <div className={styles.invoiceImg}>
            <span className={styles.grayLabel}>H??nh ???nh h??a ????n</span><br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingright: '5px', marginBottom: '10px' }}>
              <input type="file" label="File" accept="image/*" onChange={onImageChange} className={styles.invoiceImg} title='' />
              {invoiceFile && <span style={{ color: '#F93B3B', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setInvoiceFile(''); setShowInvoiceFile('') }}>Remove</span>}
            </div>
          </div>
          {showInvoiceFile && <img src={showInvoiceFile} alt='invice' width={200} height={200} style={{ borderRadius: '10px' }} onClick={() => setImgModal(true)} />}
          {loading ? <div className={styles.loader}> <CircularProgress /></div> : ""}
          {isInitalDeposit ? <div className={`${styles.whiteNotice} ${styles.small}`}>Sau khi chuy???n kho???n th??nh c??ng, qu?? kh??ch vui l??ng nh???n v??o ( k??ch ho???t t??i kho???n) ????? nh???n t??i kho???n c???a m??nh. <AiOutlineArrowDown /> </div> : ""}
          {showErrorForInitalDeposit ? <div style={{ color: 'red', textAlign: "center", fontSize: "0.9rem" }}>T??i kho???n ch??a k??ch ho???t ho???c Qu?? kh??ch ch??a chuy???n kho???n!</div> : ""}
          <button type="submit" className={styles.submitButton} >
            {loading ? "??ang t???i" : isInitalDeposit ? "K??ch ho???t t??i kho???n" : "Ho??n T???t"}
          </button>
          {isInitalDeposit ? <div style={{ color: "white", textAlign: "center", fontSize: "0.9rem", marginTop: "10px" }}>
            N???u sau khi chuy???n kho???n th??nh c??ng nh??ng ch??a K??ch Ho???t ???????c t??i kho???n , qu?? kh??ch vui l??ng li??n h??? CSKH <CustomerSupportAnimatedItem />
          </div> : ""}
        </div>
      </form >
      <Modal open={imgModal} onClose={() => setImgModal(false)}>
        <Box sx={invoiceModalStyle}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
            <h3>H??nh ???nh</h3>
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