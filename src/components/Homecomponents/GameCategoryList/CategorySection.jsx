import { useState } from 'react';
import styles from './CategorySection.module.css';
// import JsonFormate from '../../JsonFormate';
import Image1 from '../../../assets/CategoriesIcons/Inactive/InactivePopular.png';
import Image2 from '../../../assets/CategoriesIcons/Inactive/InactiveSport.png';
import Image3 from '../../../assets/CategoriesIcons/Inactive/InactiveCasino.png';
import Image4 from '../../../assets/CategoriesIcons/Inactive/InactiveGame.png';
import Image5 from '../../../assets/CategoriesIcons/Inactive/InactiveLottery.png';
import Image6 from '../../../assets/CategoriesIcons/Inactive/InactiveFish.png';

import Active1 from '../../../assets/CategoriesIcons/Active/ActivePopular.png';

import Active2 from '../../../assets/CategoriesIcons/Active/ActiveGold.png';

import Active3 from '../../../assets/CategoriesIcons/Active/ActiveCasino.png';
import Active4 from '../../../assets/CategoriesIcons/Active/ActiveGame.png';
import Active5 from '../../../assets/CategoriesIcons/Active/ActiveLottery.png';
import Active6 from '../../../assets/CategoriesIcons/Active/ActiveFish.png';


import SingleGameList from './SingleGameList/SingleGameList'

const gameCategories = [{ id: 1, name: 'PHỔ BIẾN', icon_image: Image1, icon_active: Active1 }, { id: 2, name: 'THỂ THAO', icon_image: Image2, icon_active: Active2 }
  , { id: 3, name: 'SÒNG BÀI', icon_image: Image3, icon_active: Active3 } ,{ id: 4, name: 'TRÒ CHƠI', icon_image: Image4, icon_active: Active4 }
  , { id: 5, name: 'Lotary', icon_image: Image5, icon_active: Active5 }, { id: 6, name: 'Fish', icon_image: Image6, icon_active: Active6 }]

const CategorySection = () => {

  // const [gameCategories, setGameCategories] = useState()
  const [activeCatId, setActiveCatId] = useState(gameCategories[0].id)

  return (
    <div className={styles.singleGamePageBody}>
      <div className={styles.categoryListWrapper}> 
        <div className={styles.catLitButns}>
          {gameCategories.map((game, index) => (
            <div key={index} onClick={() => setActiveCatId(game.id)} className={styles.homeMenuButnsContent}>
              <div className={`${styles.menuImgWrapper} ${activeCatId == game.id ? styles.activeCategory : ''}`}>
                <img src={activeCatId == game.id ? game.icon_active : game.icon_image} alt='img'/> 
                <div>{game.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SingleGameList activeCatId={activeCatId}/>
    </div>
  )
}

export default CategorySection
// {gameCategories && 
//   <div className={styles.catLitButns}>
//     {gameCategories.map((game, index) => (
//       <div key={index} onClick={() => setActiveCatId(game.id)} className={styles.homeMenuButnsContent}>
//         <div className={`${styles.menuImgWrapper} ${activeCatId == game.id ? styles.activeCategory : ''}`}>
//           <img src={activeCatId == game.id ? game.icon_active : game.icon_image} alt='img'/> 
//           <div>{JsonFormate(game.name)}</div>
//         </div>
//       </div>
//     ))}
//   </div>
// }