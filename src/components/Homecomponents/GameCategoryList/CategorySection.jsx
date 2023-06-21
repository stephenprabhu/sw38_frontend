import { useState } from 'react';
import styles from './CategorySection.module.css';
// import JsonFormate from '../../JsonFormate';
import Image1 from '../../../assets/testCategory/Group 3988.png';
import Image2 from '../../../assets/testCategory/Group 4415.png';
import SingleGameList from './SingleGameList/SingleGameList'

const gameCategories = [{ id: 1, name: 'Test', icon_image: Image1 }, { id: 2, name: 'Test', icon_image: Image2 }, { id: 3, name: 'Test', icon_image: Image1 }
  ,{ id: 4, name: 'Test', icon_image: Image2 }, { id: 5, name: 'Test', icon_image: Image1 }, { id: 6, name: 'Test', icon_image: Image2 }]

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