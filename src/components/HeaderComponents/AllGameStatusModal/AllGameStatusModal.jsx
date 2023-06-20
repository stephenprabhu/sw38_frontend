
import { useContext, useEffect, useState } from 'react';
import styles from './AllGameStatusModal.module.css';
import GameModalContent from './GameModalContent/GameModalContent';
import { CircularProgress, Modal } from '@mui/material';
import CommaSeperator from '../../CommaSeperator';
// import { APIAllCategoryGames } from '../../../helpers/APIs/GamesAPI';
// import { AllGameWithdrawAPI } from '../../../helpers/APIs/WithdrawAPI';
import { AiOutlineClose } from "react-icons/ai";
import UserContext from '../../../helpers/Context/user-context';
import MyLoader from '../../MyLoader';

const AllGameStatusModal = ({showBalance, onClose, loader, setLoader}) => {

  const [allCategoryGames, setAllCategoryGames] = useState()
  const [allTransferLoader, setAllTransferLoader] = useState(false)
  const [gamesWithdrawError, setGamesWithdrawError] = useState(false)

  const ctx = useContext(UserContext);
  
  useEffect(() => {
    if(showBalance) {
      // allCategoryGamesApi()
    }
  },[showBalance])
  // console.log('modal render')

  // all Category Games api
  const allCategoryGamesApi = async () => {
    // const allCategoryRes = await APIAllCategoryGames()
    // setAllCategoryGames(allCategoryRes)
  }

  // onTransferEverythingClicked Withdraw
  const onTransferEverythingClicked = async () => {
    const finalBlanceArray = []
    allCategoryGames.map(item => {
      item.game_items && item.game_items.length && item.game_items.filter(game => {
        if(game.balance != 'NETWORK_ERROR' && (+game.balance) > 0) {
          finalBlanceArray.push({game_id: game.id, amount: game.balance})
        }
      }) 
    })
    if (finalBlanceArray.lenght) {
      setAllTransferLoader(true)
      // const allGamesWithdrawApi = await AllGameWithdrawAPI(finalBlanceArray)
    // if(allGamesWithdrawApi){
      allCategoryGamesApi()
      setAllTransferLoader(false)
      setGamesWithdrawError()
    // }
    } else {
      setGamesWithdrawError('Nothing To Withdraw')
    }
    
  }

  return (
    <Modal open={showBalance}>
      <div className={styles.allGamesOverlay} onClick={onClose}>
        <div className={styles.allGamesWrapper}>
          <div className={styles.allGameHeader}>
            <div className={styles.balanceWrapper}>
              <span>Balance</span>
              <span>{ctx.userBalance && CommaSeperator(ctx.userBalance)}</span>
            </div>  
            
            {!loader && <span onClick={()=>{onClose(); setGamesWithdrawError()}}><AiOutlineClose size={24} style={{cursor:'pointer'}}/></span>}
          </div>
          <div className={styles.allGameBody}>
            {allCategoryGames ? allCategoryGames.map((category,index) => (
              <GameModalContent category={category} key={index} loader={loader} setLoader={setLoader} setAllCategoryGames={setAllCategoryGames}/>
            ))
            :
            <div className={styles.loaderOverlay}>
              <CircularProgress size={26}/>
            </div>
          }
          </div>
          {allTransferLoader && <MyLoader/>}
          {gamesWithdrawError && <div className={styles.error}>{gamesWithdrawError}</div>}
          {allCategoryGames && <div className={styles.allGameFooter} onClick={onTransferEverythingClicked}>
            All transfer
          </div>}
        </div>
      </div>
    </Modal>
    )
  }
  
  export default AllGameStatusModal
