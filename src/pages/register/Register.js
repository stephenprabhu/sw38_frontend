import React, { useContext, useEffect, useState } from 'react'
import styles from '../register/Register.module.css'
import { Link } from 'react-router-dom';
import Captcha from "../../assets/captcha.png"
import Header from '../../components/Header';
import { APIRegisterUser } from '../../helpers/APIs/UserAPIs';
import UserContext from '../../helpers/Context/user-context';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const ctx = useContext(UserContext);
    const navigate = useNavigate();



    const registerUser = async(e) => {
        e.preventDefault();
        if(phone && phone.length===10){
            const x = await APIRegisterUser(phone);
            if(!x){
                setErrorMessage("Số điện thoại này đã tồn tại trong hệ thống. Vui lòng đăng nhập để tiếp tục.");
            }else{
                localStorage.setItem('auth_token', x);
                ctx.setUser(x);
                navigate("/");
            }
        }
    }

    return (
        <div>
            <Header />
            <form className={styles.registerForm}  onSubmit={registerUser}>
                <h1 className={styles.title}>Đăng ký</h1>
                {errorMessage ? <span className={styles.error}>{errorMessage}</span> : ""}
                <div className={styles.formInput}>
                    <span>Số điện thoại</span>
                    <input type="number" value={phone} onChange={e => setPhone(e.currentTarget.value)}  placeholder='Số điện thoại' name='username' required className={styles.inputPhone} />
                    {phone && phone.length!==10 ? <span className={styles.error}>Vui lòng nhập 10 ký tự</span> : ""}
                </div>
                <div className={styles.formInput}>
                    <span>Mã xác nhận</span>
                    <div style={{display:"flex"}}>
                    <input type="text" placeholder='Mã xác nhận' name='username' className={styles.inputPhone}  />
                        <img src={Captcha} />
                    </div>
                </div>
                <button className={styles.registerButton} type="submit">Đăng ký</button>
            </form>

            <div className={styles.loginSection}>
                Đăng Nhập <Link to="/login" className={styles.loginLink}>Đăng Nhập</Link>
            </div>
        </div>
    )
}

export default Register