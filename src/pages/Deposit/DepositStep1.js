import React, { useState, useEffect, useContext } from 'react'
import styles from './Deposit.module.css'
import InnerHeader from '../../components/InnerHeader'
import { APIGetCompanyBanks } from '../../helpers/APIs/BankAPIs';
import UserContext from '../../helpers/Context/user-context';

const DepositStep1 = ({amount, setAmount, onNextStepClicked, selectedBank, setSelectedBank}) => {

    const [companyBanks, setCompanyBanks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const ctx = useContext(UserContext);
    const amountsArray = [
        {value: 100, label: "100"},
        {value: 500, label: "500"},
        {value: 1000, label: "1,000"},
        {value: 10000, label: "10,000"},
        {value: 50000, label: "50,000"},
        {value: 100000, label: "100,000"},
    ];


    useEffect(() => {
      getCompanyBanks();
    }, [])


    const getCompanyBanks = async() => {
        const x = await APIGetCompanyBanks(ctx.user);
        if(!x){
            setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
        }else{
            if(x && x.length){
                setCompanyBanks(x);
                setSelectedBank(x[0]);
            }
        }
    }
    

    return (
        <>
            <InnerHeader title={"Nạp Tiền"} />
            <div>

                <div className={styles.section}>
                    <span className={styles.label}>Các kênh thanh toán</span>
                    {errorMessage ? <span>Error Fetching Company Banks</span> : ""}
                    <div className={styles.companyBankSection}>
                        {companyBanks && companyBanks.length ? companyBanks.map(bank => (
                            <div 
                                className={`${styles.singleBankItem} ${selectedBank && selectedBank.id === bank.id ? styles.active :''}`} 
                                key={bank.id}
                                onClick={()=> setSelectedBank(bank)}
                            >
                                <img src={bank.bank_image} />
                            </div>
                        )) : ""}
                    </div>
                    <div >
                            <span className={styles.label}>Số Điểm Nạp</span>
                            <div className={styles.inputItem}>
                                <i className={styles.adjornment}>₫</i>
                                <input value={amount} onChange={e => setAmount(parseInt(e.currentTarget.value))} type="number" className={styles.whiteInput} style={{border: "none"}} />
                            </div>
                        <div className={styles.depositButtonSection}>
                            {amountsArray.map((amountObj, index) => (
                                <button 
                                    key={index}
                                    onClick={()=> setAmount(amountObj.value)} 
                                    className={`${styles.depositButton} ${amount ===  amountObj.value ? styles.active :""}`}
                                >
                                    {amountObj.label}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <button 
                    className={`${styles.submitButton} ${!amount ? styles.disabled :""}`}
                    onClick={onNextStepClicked}
                    disabled={!amount || !selectedBank}
                >
                    Tiếp theo
                </button>
            </div>
        </>
    )
}

export default DepositStep1