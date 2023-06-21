import styles from './LinksPage.module.css';
import { BiRightArrowCircle } from "react-icons/bi";
import HeaderLogo from './../../assets/sv388-min.png';
import CustomerSupportAnimatedItem from '../../components/CustomerSupportAnimatedItem';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../helpers/Context/user-context';
import Layout from '../../Layout/Layout';

const gameLinks = ['https://www.sfv388.com/', 'https://www.svw388.com/', 'https://www.swv388.com/']

const LinksPage = () => {
  const ctx = useContext(UserContext);
  const user = ctx.user;
  const navigate = useNavigate()
  return (
    <Layout title='Game Links'>
      <div className={styles.linkstOverlay}>
        <div className={styles.linksContentWrapper}>
          <div className={styles.logoWrapper}>
            <img src={HeaderLogo} width={130} alt='headerLogo'/>
          </div>
          <div className={styles.linksWrapper}>
            <div className={styles.sectionContentWrapper}>
              <div className={styles.section}>
                {gameLinks.map((item, index) => (
                  <div className={styles.linkContent} onClick={() => window.open(item)} key={index}>
                    <div className={styles.linkNameGrp}>
                      <span>{index+1}</span>
                      <strong>Link</strong>
                    </div>
                    <BiRightArrowCircle size={40} className={styles.linkIcon} />
                  </div>
                ))}
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
    </Layout>
  )
}

export default LinksPage
