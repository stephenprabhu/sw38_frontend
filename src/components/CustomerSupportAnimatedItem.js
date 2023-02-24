import React from 'react'
import Hours24Suport from '../assets/24hours.png'


const CustomerSupportAnimatedItem = () => {
    return (
        <div 
            style={{display:"inline", alignItems:"center",  color: "#f4d780", cursor:"pointer"}}
            onClick={()=> window.open('https://direct.lc.chat/14707113/')}
            >
                👉🏻 Hỗ trợ <img style={{marginTop:"3px", marginLeft:"2px"}} src={Hours24Suport} />
        </div>
    )
}

export default CustomerSupportAnimatedItem