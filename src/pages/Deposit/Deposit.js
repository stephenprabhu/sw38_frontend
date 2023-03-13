import { useEffect, useState, useContext } from 'react';
import DepositStep1 from './DepositStep1';
import DepositStep2 from './DepositStep2';
import { APIGetCompanyBanks } from '../../helpers/APIs/BankAPIs';
import UserContext from '../../helpers/Context/user-context';


const Deposit = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const isInitalDeposit = params && params.initial;
  const [amount, setAmount] = useState(isInitalDeposit ? '150000' : '');
  const [step2, setStep2] = useState(isInitalDeposit ? true : false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [companyBanks, setCompanyBanks] = useState([]);
  const ctx = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);

  //  get company all bank list 
  const getCompanyBanks = async () => {
    if (ctx.user) {
      const x = await APIGetCompanyBanks(ctx.user);
      if (!x) {
        setErrorMessage("Số điện thoại hoặc mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
      } else {
        if (x && x.length) {
          setCompanyBanks(x);
          setSelectedBank(x[0]);
        }
      }
    }
  }

  useEffect(() => {
    getCompanyBanks();
  }, [])

  return (
    <div style={{ height: '100%' }}>
      {step2 ?
        <DepositStep2
          amount={amount}
          onPrevStepClicked={() => setStep2(false)}
          selectedBank={selectedBank}
          isInitalDeposit={isInitalDeposit}
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
    </div>
  )
}

export default Deposit