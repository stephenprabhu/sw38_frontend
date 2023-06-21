import { useEffect, useState } from 'react';
import styles from './SingleGameList.module.css';
// import { APICategoryGameList } from '../../../helpers/APIs/GamesAPI';
import { useNavigate } from 'react-router-dom';
// import PlayGameModal from '../../../components/PlayGameModal/PlayGameModal';
import NoRecordFound from '../../../NoRecordFound/NoRecordFound';
import MyLoader from '../../../MyLoader';
import game1 from '../../../../assets/testCategory/1.png';
import game2 from '../../../../assets/testCategory/2.png';
import game3 from '../../../../assets/testCategory/3.png';
import game4 from '../../../../assets/testCategory/4.png';
import game5 from '../../../../assets/testCategory/5.png';
import game6 from '../../../../assets/testCategory/6.png';

const games = [game1, game2, game3, game4 ,game5, game6]

const SingleGameList = ({activeCatId}) => {

  // const [games, setGames] = useState()
  const [loading, setLoading] = useState(false)
  const [singleGameModal, setSingleGameModal] = useState()
  const navigate = useNavigate()

  useEffect(() =>{
    // categoryListApi(activeCatId)
    // console.log(activeCatId)
  }, [activeCatId])

  // Single Category Games list
  // const categoryListApi = async (id) => {
  //   setLoading(true)
  //   const res = await APICategoryGameList(id)
  //   setGames(res)
  //   setLoading(false)
  // }

  // open game Modal
  const openGameModal = async (game) => {
    // if(localStorage.getItem('auth_token')) {
    //   setSingleGameModal(game)
    // } else {
    //   navigate('/login')
    // }
  }

  return (
    <div className={styles.gamesListWrapper}>
      {!loading ?
        <div className={styles.gamesBodyList}>
          {games && games.length ? games.map((game, index) => (
            <div key={index} className={styles.gameImageWrapper} onClick={() => openGameModal(game)}>
              <img src={game} alt='img'/> 
            </div>
            ))
            :
            <NoRecordFound/>
          }
        </div>
        : 
        <MyLoader/>
      }
      {/*<PlayGameModal singleGameModal={singleGameModal} setSingleGameModal={setSingleGameModal} />*/}
    </div>
  )
}

export default SingleGameList
 