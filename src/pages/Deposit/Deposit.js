import React, { useState, useEffect } from 'react'
import styles from './Deposit.module.css'
import DepositStep1 from './DepositStep1';
import DepositStep2 from './DepositStep2';


const Deposit = () => {
    const [amount, setAmount] = useState();
    const [step2, setStep2] = useState(false);
    const [selectedBank, setSelectedBank]= useState(null);



    return (
        <div className={styles.deposit}>
            {step2 ? 
                <DepositStep2 
                    amount={amount} 
                    onPrevStepClicked={()=> setStep2(false)}
                    selectedBank={selectedBank}
                /> : 
                <DepositStep1 
                    amount={amount} 
                    setAmount={setAmount} 
                    onNextStepClicked={()=> setStep2(true)} 
                    selectedBank={selectedBank}
                    setSelectedBank={setSelectedBank}
                />
            }
        </div>
    )
}

export default Deposit