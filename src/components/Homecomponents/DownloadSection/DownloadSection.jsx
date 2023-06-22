import styles from './DownloadSection.module.css';
import AgentImg from '../../../assets/Agent.png';
import AppImg from '../../../assets/App.png';
import DepositImg from '../../../assets/Deposit.png';
import WithdrawImg from '../../../assets/Withdraw.png';
import { useNavigate } from 'react-router-dom';

const headerBtns = [{image: AppImg , name: 'App', page: ''}, {image: DepositImg , name: 'NẠP TIỀN', page: '/deposit'}, {image: WithdrawImg , name: 'RÚT TIỀN', page: '/withdraw'}]

const DownloadSection = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.singleGamePageHeader}>
      <div className={styles.agentImgSection}>
        <img src={AgentImg} alt='agentImage'/>
        <p onClick={() => navigate('/agent/register')}>ĐẠI LÝ</p>
      </div>
      <div className={styles.imageTextWrapper}>
        {headerBtns.map(btn => (
          <div key={btn.name} onClick={() => navigate(btn.page)}>
            <img src={btn.image} alt={btn.name}/>
            <span>{btn.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DownloadSection