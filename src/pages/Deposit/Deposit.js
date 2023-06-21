import { useEffect, useState } from 'react';
import DepositStep1 from './DepositStep1';
import DepositStep2 from './DepositStep2';
import { APIGetCompanyBanks } from '../../helpers/APIs/BankAPIs';
// import UserContext from '../../helpers/Context/user-context';
import { APIUser } from '../../helpers/APIs/UserAPIs';
import Layout from '../../Layout/Layout';

const Deposit = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const isInitalDeposit = params && params.initial;
  const [amount, setAmount] = useState(isInitalDeposit ? '150000' : '');
  const [step2, setStep2] = useState(isInitalDeposit ? true : false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [companyBanks, setCompanyBanks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userCredential, setUserCredential] = useState([])
  // const ctx = useContext(UserContext);
  
  const userAuth = localStorage.getItem('auth_token')
 
  // companybanks, user Data
  useEffect(() => {
    getCompanyBanks();
    userData();
  }, [])

  //  get company all bank list 
  const getCompanyBanks = async () => {
    if (userAuth) {
      const x = await APIGetCompanyBanks(userAuth);
      if (!x) {
        setErrorMessage("Đã xảy ra lỗi, vui lòng liên hệ Chăm sóc khách hàng");
      } else {
        if (x && x.length) {
          setCompanyBanks(x);
          setSelectedBank(x[0]);
        }
      }
    }
  }

  // user APi
  const userData = async () => {
    const userAPI = await APIUser()
    setUserCredential(userAPI)
  }

  return (
    <Layout title={step2 ? "Thông tin nạp tiền" : "Nạp Tiền"} active='Nạp Tiền'>
      {step2 ?
        <DepositStep2
          amount={amount}
          // onPrevStepClicked={() => setStep2(false)}
          selectedBank={selectedBank}
          userCredential={userCredential}
          // isInitalDeposit={isInitalDeposit}
        /> :
        <DepositStep1
          amount={amount}
          setAmount={setAmount}
          onNextStepClicked={() => setStep2(true)}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          companyBanks={companyBanks}
          errorMessage={errorMessage}
        />
      }
    </Layout>
  )
}

export default Deposit