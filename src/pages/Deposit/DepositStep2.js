import InnerHeader from "../../components/InnerHeader"
import styles from './Deposit.module.css'
import { useState } from "react";
import {CiCreditCard1} from "react-icons/ci";
import { APIMakeDepositRequest } from "../../helpers/APIs/TransactionAPI";


const DepositStep2 = ({amount, onPrevStepClicked, selectedBank}) => {
    const [invoiceFile, setInvoiceFile] = useState("null");
    const [accountNo, setAccountNo] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);

    const items = [
        {label: "Nạp tiền tài khoản", value: "username"},
        {label: "Nạp tiền ngân hàng", value: selectedBank.bank_name},
        {label: "Tên tài khoản nhận", value: selectedBank.bank_account_name},
        {label: "Tên tài khoản nhận (bính âm)", value: selectedBank.bank_account_name},
        {label: "Số tài khoản", value: selectedBank.bank_account_number},
        {label: "Số Điểm Nạp", value: amount},
        {label: "Ghi chú", value: ""},
    ];


    const onDepositSubmitClicked = async()=> {
        if(invoiceFile && accountNo && amount && selectedBank){
            const x = await APIMakeDepositRequest(amount, accountNo, selectedBank.id, invoiceFile);
                if(!x){
                    setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
                }else{
                    console.log(x);
                }
        }
    }


    return (
        <>
            <InnerHeader title={"Thông tin nạp tiền"} />
            <div style={{flex: 1}}>
                <h3 style={{textAlign:"center"}}>Lưu ý : 1 điểm = 1000 VND</h3>
                <div className={styles.section}>
                    <span className={styles.label}>Thông tin tiền gửi</span>
                    {items.map((item, index) => <CopyItemComponent key={index} item={item} />)}
                    <div style={{padding: "10px"}}>
                        <span className={styles.grayLabel}>Hình ảnh</span><br />
                        <input 
                            type="file"  
                            label="File" 
                            accept="image/*" 
                            onChange={e => setInvoiceFile(e.currentTarget.files[0])}
                        />
                    </div>
                    <span className={styles.grayLabel}>Tài khoản người chuyển</span>
                    <div className={styles.inputItem} style={{marginTop:"10px"}}>
                        <CiCreditCard1 size={25} style={{color:"gray"}} />
                        <input value={accountNo} className={styles.whiteInput} style={{border: "none"}} placeholder="＊ Vui lòng nhập số tài khoản" onChange={(e)=> setAccountNo(e.currentTarget.value)} />
                    </div>
                </div>
            </div>
            <div className={`${styles.submitButton}`}>
                <button className={`${styles.depositButton}  ${styles.cancel}`} onClick={onPrevStepClicked}>
                    Trở Về
                </button>
                <button className={`${styles.depositButton} ${styles.final}`} disabled={!invoiceFile || !accountNo} onClick={onDepositSubmitClicked}>
                    Hoàn Tất
                </button>
            </div>
        </>
    )
}


const CopyItemComponent = ({item}) => {

    const onCopyClicked = () => {
        navigator.clipboard.writeText(item.value);
    }

    return (
        <div className={styles.bankDetailItem}>
            <div>
                <span className={styles.grayLabel}>{item.label}</span><br />
                <span className={styles.grayValue}>{item.value}</span>
            </div>
            <button className={styles.copyButton} onClick={onCopyClicked}>
                Copy
            </button>
        </div>
    )
}

export default DepositStep2