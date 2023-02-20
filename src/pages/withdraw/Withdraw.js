import React, { useContext } from 'react'
import { BsPlus } from 'react-icons/bs'
import InnerHeader from '../../components/InnerHeader'
import UserContext from '../../helpers/Context/user-context'
import styles from './Withdraw.module.css'

const Withdraw = () => {
    const ctx = useContext(UserContext);

  return (
    <div className={styles.layout}>
        <InnerHeader title="Rút Tiền" />
        {ctx.user.name}
        <div>
            <h4>Thẻ ngân hàng của tôi</h4>
        </div>
        <div className={styles.section}>
            <div className={styles.banksSection}>
                <div className={styles.bankCard}>
                    <span>TECHCOMBANK</span>
                </div>
            </div>


            <div className={styles.divider}>
                <div className={styles.addButton}>
                    <BsPlus size={25} />
                </div>
            </div>

            <div className={styles.formSecton}>
               <div className={styles.balanceSection}>
                <div>
                        Ví chính: ₫ 0.00
                    </div>
                    <div>
                        Số dư tài khoản: ₫ 0.00
                    </div>
               </div>
                <div className={styles.inputItem}>
                <span>Số tiền</span>
                <input className={styles.whiteInput} style={{border: "none"}} placeholder="100 - 100,000" />
                </div>
                <div className={styles.inputItem}>
                    <span>Mật khẩu rút tiền</span>
                    <input className={styles.whiteInput} style={{border: "none"}}  />
                </div>
                <button className={styles.submit}>Xác nhận</button>
            </div>
        </div>
    </div>
  )
}

export default Withdraw