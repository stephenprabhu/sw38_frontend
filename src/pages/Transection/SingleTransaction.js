import { useState, useEffect } from "react";
import styles from './SingleTransaction.module.css';
import { APIGetSingleTransaction } from "../../helpers/APIs/TransactionAPI";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { addCommasToInput } from "../../helpers/NumberHelper";

const SingleTransaction = () => {
  const [tranData, setTranData] = useState()
  const transactionId = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    transactionCall();
  }, [])

  const transactionCall = async () => {
    const res = await APIGetSingleTransaction(localStorage.getItem('auth_token'), transactionId.id);
    setTranData(res)
  }

  console.log(tranData)

  const items = [
    { label: "Ngân hàng nạp tiền", value: tranData ? tranData.bankable.bank_name : "Đang tải..", copy: false },
    { label: "Tên tài khoản nhận", value: tranData ? tranData.bankable.bank_account_name : "Đang tải..", copy: false, fontSmall: true },
    { label: "Số tài khoản", value: tranData ? tranData.bankable.bank_account_number && tranData.bankable.bank_account_number.replace(/\d{4}(?=.)/g, '$& ') : "Đang tải..", copy: true },
    { label: "Số tiền nạp", value: tranData ? addCommasToInput(tranData.transaction_amount) : "Đang tải..", copy: false },
    { label: "Nội dung chuyển khoản", value: tranData ? tranData.user.phone : "Đang tải..", copy: true, redText: true },
    { label: "Ngày", value: tranData ? new Date(tranData.created_at).toLocaleString("vi-VN") : "Đang tải..", copy: false },
    { label: "Trạng thái", value: tranData ? checkStatus(tranData.is_approved) : "Đang tải..", copy: false },
  ];

  if (tranData && tranData.is_approved === 2) {
    items.push({ label: "Lý do", value: tranData ? tranData.note : "Đang tải..", redText: true });
  }

  return (
    <div className={styles.singleTranWrapper}>
      <div className={styles.titleWrapper}>
        <IoArrowBack onClick={() => navigate("/transections")} style={{ cursor: 'pointer' }} size={26} />
        <h3>Giao dịch</h3>
      </div>
      <div className={styles.singleTranContentOverlay} >
        <div className={styles.singleTranContentWrapper}>
          {items.map((item, index) => <CopyItemComponent key={index} item={item} />)}
        </div>
      </div>
    </div>
  )
}

export default SingleTransaction

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

const checkStatus = (status) => {
  if (status === 0) {
    return 'Chờ xử lý'
  } else if (status === 1) {
    return 'Đã phê duyệt'
  } else if (status === 2) {
    return 'Từ chối'
  } else if (status === 3) {
    return 'Đang xử lý'
  }
}