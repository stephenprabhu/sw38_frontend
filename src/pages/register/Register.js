import React, { useContext, useEffect, useState } from 'react'
import styles from '../register/Register.module.css'
import { Link } from 'react-router-dom';
import Captcha from "../../assets/svcaptcha.png"
import Header from '../../components/Header';
import { APIRegisterUser } from '../../helpers/APIs/UserAPIs';
import UserContext from '../../helpers/Context/user-context';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const ctx = useContext(UserContext);
    const navigate = useNavigate();



    const registerUser = async(e) => {
        e.preventDefault();
        if(!captcha || captcha.trim().toLowerCase() !== "svw38"){
            setErrorMessage("Mã xác nhận không hợp lệ");
            return ;
        }
        if(phone && phone.length===10){
            const x = await APIRegisterUser(phone);
            if(!x){
                setErrorMessage("Số điện thoại này đã tồn tại trong hệ thống. Vui lòng đăng nhập để tiếp tục.");
            }else{
                localStorage.setItem('auth_token', x);
                ctx.setUser(x);
                ctx.setFirstTimeLogin(true);
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
                    <span>Mật khẩu</span>
                    <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}  placeholder='Mật khẩu' name='password' required className={styles.inputPhone} />
                    {password && password.length<8 ? <span className={styles.error}>Mật khẩu phải từ 8 ký tự trở lên.</span> : ""}
                </div>
                <div className={styles.formInput}>
                    <span>Mã xác nhận</span>
                    <div style={{display:"flex"}}>
                    <input 
                        type="text" 
                        placeholder='Mã xác nhận' 
                        name='captcha' 
                        className={styles.inputPhone} 
                        value={captcha}
                        onChange={(e)=> setCaptcha(e.currentTarget.value)}
                    />
                        <img src={Captcha} width="100px" />
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