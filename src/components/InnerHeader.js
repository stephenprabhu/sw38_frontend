import styles from './InnerHeader.module.css'
import { BsChevronLeft } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext } from 'react';
import UserContext from '../helpers/Context/user-context';

const InnerHeader = ({ title }) => {

  const navigate = useNavigate()
  const ctx = useContext(UserContext);
  
  const onLogOutClicked = () => {
    ctx.setUser(null);
    ctx.setUserInfo({
      name: '',
      password: '',
    });
    localStorage.removeItem("auth_token");
    navigate('/login')
  }
  
  return (
    <div className={styles.innerHeader}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <BsChevronLeft size={25} color='#FCE8AE' />
      </Link>
      <div>
        <span className={styles.headerTitle}>{title}</span>
      </div>
      <div>
        <Link to='/profile'><BsFillPersonFill size={26} className={styles.profileIcon} /></Link>
        <RxExit onClick={onLogOutClicked} className={styles.profileIcon} size={22} />
      </div>
    </div>
  )
}

export default InnerHeader