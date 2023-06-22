import { Divider } from '@mui/material';
import styles from './GameModalContent.module.css';
import JsonFormate from '../../../JsonFormate';
import { CircularProgress } from '@mui/material'
import CommaSeperator from '../../../CommaSeperator';
// import { SingleGameWithdrawAPI } from '../../../../helpers/APIs/WithdrawAPI';
import UserContext from '../../../../helpers/Context/user-context';
import { useContext, useState } from 'react';
import MyLoader from '../../../MyLoader';
// import { APIAllCategoryGames } from '../../../../helpers/APIs/GamesAPI';

const GameModalContent = ({category, loader, setLoader, changeGameBalance, setAllCategoryGames}) => {
  // console.log(category && category.game_items)
  
  const [apiError, setApiError] = useState()

  // const [individualGameBalance, setIndividualGameBalance] = useState()
  // console.log(item)
  // const authToken = localStorage.getItem('auth_token')
  const ctx = useContext(UserContext);

  // single withdraw API
  const singleWithdrawHandler = async (selectedGame) => {
    // changeGameBalance(selectedGame)
    // setAllCategoryGames()
    
    setLoader(selectedGame.id)
    // const singleGameWithdraw = await SingleGameWithdrawAPI(selectedGame.id, selectedGame.balance)
    // console.log(singleGameWithdraw)
    // if(singleGameWithdraw.status) {
    //   ctx.setUserBalance(singleGameWithdraw.balance)
    //   // all Category Games api
    //   const allCategoryRes = await APIAllCategoryGames()
    //   if(allCategoryRes) {
    //     console.log('new call')
    //     console.log(allCategoryRes)
    //   }
    //   setAllCategoryGames(allCategoryRes)
    //   setLoader(null)
    // }
  }

  return (
    <div className={styles.innerOverlay}>
      <div className={styles.innerContent}>
        <h4>Cat Name</h4>
        <Divider color='white' style={{marginBottom:'5px'}}/>
        {category && category.game_items.length ?
          category.game_items.map((game, index) => (
            <div className={styles.rowData} key={index}>
              <h5>{JsonFormate(game.name)}</h5>
              <div className={styles.transferGrp}>
                {apiError == game.id && <span className={styles.orangeTxt}>{game.balance === 'NETWORK_ERROR' ? "error" : typeof game.balance === 'number' ?  CommaSeperator(game.balance) : 0}</span>}
                {!apiError && loader == game.id && <CircularProgress size={12}/>}
                {apiError != game.id && <span className={`${styles.balance} ${game.balance == 'NETWORK_ERROR' ? styles.orangeTxt : ''}`}>{game.balance === 'NETWORK_ERROR' ?  "error" : typeof game.balance === 'number'  ?  CommaSeperator(game.balance) : 0}</span>}
                {(+game.balance) > 0 &&  !loader && apiError != game.id ? <button onClick={() => singleWithdrawHandler(game)}>Transfer</button> : ''}
              </div>
            </div>
          )) 
        :
        <div className={styles.noGames}>No Games</div>
      }
      </div>
    </div>
  )
}

export default GameModalContent

// <div className={styles.innerOverlay}>
//       <div className={styles.innerContent}>
//         <h4>{JsonFormate(category.name)}</h4>
//         <Divider color='white' style={{marginBottom:'5px'}}/>
//         {category && category.game_items.length ?
//           category.game_items.map((game, index) => (
//             <div className={styles.rowData} key={index}>
//               <h5>{JsonFormate(game.name)}</h5>
//               <div className={styles.transferGrp}>
//                 {apiError == game.id && <span className={styles.orangeTxt}>{game.balance === 'NETWORK_ERROR' ? "error" : typeof game.balance === 'number' ?  CommaSeperator(game.balance) : 0}</span>}
//                 {!apiError && loader == game.id && <CircularProgress size={12}/>}
//                 {apiError != game.id && <span className={`${styles.balance} ${game.balance == 'NETWORK_ERROR' ? styles.orangeTxt : ''}`}>{game.balance === 'NETWORK_ERROR' ?  "error" : typeof game.balance === 'number'  ?  CommaSeperator(game.balance) : 0}</span>}
//                 {(+game.balance) > 0 &&  !loader && apiError != game.id ? <button onClick={() => singleWithdrawHandler(game)}>Transfer</button> : ''}
//               </div>
//             </div>
//           )) 
//         :
//         <div className={styles.noGames}>No Games</div>
//       }
//       </div>
//     </div>




// {(game.balance != 'NETWORK_ERROR' || game.balance > '0.0000') && !loader ? <button onClick={() => singleWithdrawHandler({id :game.id, balance: game.balance})}>Transfer</button> : ''}