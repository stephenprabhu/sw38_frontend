import InnerHeader from '../../components/InnerHeader';
import styles from './LinksPage.module.css';
import { BiRightArrowCircle } from "react-icons/bi";
import HeaderLogo from './../../assets/sv388-min.png';
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../helpers/Context/user-context';

const LinksPage = () => {
  const ctx = useContext(UserContext);
  const user = ctx.user;
  const navigate = useNavigate()
  return (
    <div className={styles.linkstOverlay}>
      <InnerHeader />
      <div className={styles.linksContentWrapper}>
        <div className={styles.logoWrapper}>
          <img src={HeaderLogo} width={130} alt='headerLogo'/>
        </div>
        <div className={styles.linksWrapper}>
          <div className={styles.sectionContentWrapper}>
            <div className={styles.section}>
              <div className={styles.linkContent} onClick={() => window.open("https://www.sfv388.com/")}>
                <div className={styles.linkNameGrp}>
                  <span>1</span>
                  <strong>Link</strong>
                </div>
                <BiRightArrowCircle size={40} color='#0D2259' />
              </div>
              <div className={styles.linkContent} onClick={() => window.open('https://www.svw388.com/')}>
                <div className={styles.linkNameGrp}>
                  <span>2</span>
                  <strong>Link</strong>
                </div>
                <BiRightArrowCircle size={40} color='#0D2259' />
              </div>
              <div className={styles.linkContent} onClick={() => window.open('https://www.swv388.com/')}>
                <div className={styles.linkNameGrp}>
                  <span>3</span>
                  <strong>Link</strong>
                </div>
                <BiRightArrowCircle size={40} color='#0D2259' />
              </div>
              {user && 
                <div className={styles.noAccountWrapper}>
                  <div>Bạn chưa có tài khoản?</div>
                  <div onClick={() => navigate('/register')}>Đăng ký</div>
                </div>
              }
            </div>
            <div className={styles.customerMessageWrapper}>
              <p>Bấm vào đây để được</p>
              <CustomerSupportAnimatedItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinksPage
